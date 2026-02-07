import { supabase } from "./supabaseClient";

/* =========================
   AUTH
========================= */
export const getSession = () => supabase.auth.getSession();
export const signOut = () => supabase.auth.signOut();

export const signInWithGoogle = (redirectTo: string) =>
    supabase.auth.signInWithOAuth({
        provider: "google",
        options: { redirectTo },
    });

/* =========================
   COMMENTS
========================= */
export const getCommentCount = (postSlug: string) =>
    supabase
        .from("comments")
        .select("*", { count: "exact", head: true })
        .eq("post_slug", postSlug);

export const getUserCommentCount = (postSlug: string, userId: string) =>
    supabase
        .from("comments")
        .select("*", { count: "exact", head: true })
        .eq("post_slug", postSlug)
        .eq("user_id", userId);

export const getComments = (postSlug: string, from: number, to: number) =>
    supabase
        .from("comments")
        .select(`*, profiles(full_name, avatar_url)`)
        .eq("post_slug", postSlug)
        .order("created_at", { ascending: false })
        .range(from, to);

export const addComment = (
    postSlug: string,
    userId: string,
    content: string,
) =>
    supabase
        .from("comments")
        .insert({ post_slug: postSlug, user_id: userId, content })
        .select()
        .single();

export const updateComment = (id: string, content: string) =>
    supabase.from("comments").update({ content }).eq("id", id);

export const deleteComment = (id: string) =>
    supabase.from("comments").delete().eq("id", id);

/* =========================
   LIKES
========================= */
export const getLikeCount = (postSlug: string) =>
    supabase
        .from("likes")
        .select("*", { count: "exact", head: true })
        .eq("post_slug", postSlug);

export const getUserLike = (postSlug: string, userId: string) =>
    supabase
        .from("likes")
        .select("id")
        .eq("post_slug", postSlug)
        .eq("user_id", userId)
        .single();

export const likePost = (postSlug: string, userId: string) =>
    supabase.from("likes").insert({ post_slug: postSlug, user_id: userId });

export const unlikePost = (postSlug: string, userId: string) =>
    supabase
        .from("likes")
        .delete()
        .eq("post_slug", postSlug)
        .eq("user_id", userId);

/* =========================
   REALTIME
========================= */
export const subscribeToComments = (
    postSlug: string,
    callback: () => void,
) => {
    const channel = supabase
        .channel(`comments:${postSlug}`)
        .on(
            "postgres_changes",
            {
                event: "*",
                schema: "public",
                table: "comments",
                filter: `post_slug=eq.${postSlug}`,
            },
            callback,
        )
        .subscribe();

    // return cleanup function
    return () => {
        supabase.removeChannel(channel);
    };
};

export const subscribeToLikes = (
    postSlug: string,
    callback: () => void,
) => {
    const channel = supabase
        .channel(`likes:${postSlug}`)
        .on(
            "postgres_changes",
            {
                event: "*",
                schema: "public",
                table: "likes",
                filter: `post_slug=eq.${postSlug}`,
            },
            callback,
        )
        .subscribe();

    return () => {
        supabase.removeChannel(channel);
    };
};

