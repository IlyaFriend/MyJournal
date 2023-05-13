import { BlogContent } from "~/types/blog";
import { UserContent } from "~/types/user";

export const useGetBlogsById = async (id: string) => {
  return await Api.request("get", `/blogs/userBlogs/${id}`);
}

export const usePostBlog = async (data: BlogContent, next: Function) => {
  if (!data.header) {
    alert("Header is required.");
    return;
  }
  if (!data.article) {
    alert("Article text is required.");
    return;
  }
  const res = await Api.request("post", `/blogs/`, JSON.stringify(data), {
    "Content-Type": "application/json",
  });
  if (res.status === 201) {
    alert("Article created!");
  }
  next();
};

export const useEditBlog = async (blogId: string, articleData: BlogContent) => {
  const res = await Api.request("put", `/blogs/${blogId}`, articleData, {
    "Content-Type": "application/json",
  });
  if (res.status == 200) {
    location.reload();
  } else {
    alert("Error occured.");
  }
};

export const useDeleteBlog = async (blogId: string) => {
  const res = await Api.request("delete", `/blogs/${blogId}`).then((res) => {
    return res;
  });
  if (res.status === 200) {
    location.reload();
  } else {
    alert("Error occured.");
  }

  return res;
};

export const usePostComment = async (
  blogId: string,
  commentText: string,
  next: Function = () => {}
) => {
  if (!commentText.trim()) return;
  const data = {
    review: commentText,
  };

  const res = await Api.request(
    "post",
    `/blogs/${blogId}/comments`,
    JSON.stringify(data),
    {
      "Content-Type": "application/json",
    }
  );
  if (res.status === 201) {
    next(res);
  } else {
    alert("Error occured.");
  }
};

export const useEditComment = async (
  blogId: string,
  commentId: string,
  text: string,
  next: Function = () => {}
) => {
  const res = await Api.request(
    "put",
    `/blogs/${blogId}/comments/${commentId}`,
    {
      review: text,
    },
    { "Content-Type": "application/json" }
  );
  if (res.status === 200) {
    next(res);
  } else {
    alert("Error occured.");
  }
};

export const useDeleteComment = async (
  blogId: string,
  commentId: string,
  next: Function = () => {}
) => {
  const res = await Api.request(
    "delete",
    `/blogs/${blogId}/comments/${commentId}`
  ).then((res) => {
    return res;
  });

  if (res.status === 200) {
    next(res);
  } else {
    alert("Error occured.");
  }

  return res;
};

export const useEditUser = async (
  id: string,
  userData,
  next: Function = () => {}
) => {
  try {
    const res = await Api.request(
      "put",
      `/users/${id}`,
      JSON.stringify(userData),
      { "Content-Type": "application/json" }
    );
    next(res);
    if (userData.username) {
      const usernameCookie = useCookie("username");
      usernameCookie.value = userData.username;
    }
  } catch (e) {
    alert("Could not update user. Probably, username is already used.");
  }
};

export const useDeleteUser = async (
  userId: string,
  next: Function = () => {}
) => {
  const user = await getCurrentUser();
  const blogs = await Api.request("get", `/blogs/userBlogs/${user._id}`);

  for (const blog of blogs) {
    await useDeleteBlog(blog._id);
  }

  const res = await Api.request("delete", `/users/${userId}`).then((res) => {
    return res;
  });

  if (res.status === 200) {
    next(res);
  } else {
    alert("Error occured.");
  }

  useLogout();
  return res;
};

export const useLogout = () => {
  const jwtCookie = useCookie("jwt");
  const usernameCookie = useCookie("username");
  jwtCookie.value = null;
  usernameCookie.value = null;

  navigateTo("/login");
};

export const usePostFollowing = async (
  userId: string,
  id: string,
  next: Function = () => {}
) => {
  if (!userId.trim()) return;
  const data = {
    id,
  };

  const res = await Api.request(
    "post",
    `/users/subscribe/${userId}`,
    JSON.stringify(data),
    {
      "Content-Type": "application/json",
    }
  );
  if (res.status === 201) {
    next(res);
  } else {
    alert("Error occured.");
  }
};

export const useDeleteFollowing = async (
  userId: string,
  id: string,
  next: Function = () => {}
) => {
  if (!id.trim()) return;
  const data = {
    id,
  };

  const res = await Api.request(
    "delete",
    `/users/subscribe/${userId}`,
    JSON.stringify(data),
    {
      "Content-Type": "application/json",
    }
  );
  if (res.status === 200) {
    next(res);
  } else {
    alert("Error occured.");
  }
};