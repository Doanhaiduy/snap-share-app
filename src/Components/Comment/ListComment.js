import React, { useEffect, useState, useCallback } from "react";
import CommentItem from "./CommentItem";
import { collection, doc, getDoc, getDocs, onSnapshot, orderBy, query, where } from "firebase/firestore";
import { db } from "~/firebase/firebase-config";

function ListComment({ post }) {
    const [listComment, setListComment] = useState([]);
    useEffect(() => {
        const fetchComments = async () => {
            try {
                const commentsRef = collection(db, "comments");
                const querySnapshot = await getDocs(
                    query(commentsRef, where("uidPost", "==", post.uid)),
                    orderBy("releaseDate", "desc")
                );
                const comments = [];
                querySnapshot.forEach((doc) => {
                    const commentData = doc.data();
                    comments.push(commentData);
                });
                setListComment(comments);
            } catch (error) {
                console.log("Lỗi khi lấy dữ liệu:", error);
            }
        };
        fetchComments();

        const unsubscribe = onSnapshot(
            query(collection(db, "comments"), where("uidPost", "==", post.uid)),
            (snapshot) => {
                const comments = [];
                snapshot.forEach((doc) => {
                    const commentData = doc.data();
                    comments.push(commentData);
                });
                const sortedComments = comments.sort((a, b) => {
                    const dateA = new Date(a.releaseDate);
                    const dateB = new Date(b.releaseDate);
                    return dateB - dateA;
                });
                setListComment(sortedComments);
            }
        );

        return () => unsubscribe();
    }, [post.uid]);

    return (
        <div className="py-4 flex flex-col gap-y-5 ">
            {listComment.map((comment) => (
                <CommentItem data={comment} key={comment.uid} />
            ))}
        </div>
    );
}

export default ListComment;
