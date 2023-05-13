import { UserContent } from "~/types/user";

export const validateUserData = (
  userData: UserContent,
  allFields: boolean = false
) => {
  if (allFields) {
    for (const key in userData) {
      if (!userData[key].trim().length)
        return {
          error: {
            message: "All fields must be filled in.",
          },
        };
    }
  }
  if (userData.username) {
    const usernameRegex = /^[a-zA-Z0-9_]+$/;
    if (userData.username.length < 4)
      return {
        error: {
          message: "Username must be at least 4 characters",
        },
      };
    if (!userData.username.match(usernameRegex))
      return {
        error: {
          message: "Inappropriate characters in username field.\nOnly letters and numbers can be used.",
        },
      };
  }

  const nameRegex = /^[a-zA-Z0-9\u0400-\u04FF]+$/;
  if (userData.firstname) {
    if (!userData.firstname.match(nameRegex))
      return {
        error: {
          message: "Inappropriate characters in firstname field.\nOnly letters can be used.",
        },
      };
  }

  if (userData.lastname) {
    if (!userData.lastname.match(nameRegex))
      return {
        error: {
          message: "Inappropriate characters in lastname field.\nOnly letters can be used.",
        },
      };
  }

  if (userData.password) {
    let resValPassword = validatePassword(userData.password)
    if (resValPassword.error) return resValPassword.error.message;
  }

  return {
    data: {
      message: "Input is appropriate",
    },
  };
};

export const validatePassword = (password: string) => {
  const usernameRegex = /^[a-zA-Z0-9]+$/;
  if (password.length < 6)
    return {
      error: {
        message: "Password must be at least 6 characters",
      },
    };
  if (!password.match(usernameRegex))
    return {
      error: {
        message: "Inappropriate characters in password field.\nOnly letters and numbers can be used.",
      },
    };
  return { data: {
    message: "Password is appropriate"
  }}
};
