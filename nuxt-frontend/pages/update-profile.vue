<template>
  <the-form-section :on-submit="editUser">
    <div>
      <label for="username">Username</label>
      <input v-model="username" type="text" name="username" />
    </div>
    <div>
      <label for="firstname">Firstname</label>
      <input v-model="firstname" type="text" name="firstname" />
    </div>
    <div>
      <label for="lastname">Lastname</label>
      <input v-model="lastname" type="text" name="lastname" />
    </div>
  </the-form-section>
  <the-form-section :on-submit="editPassword">
    <div>
      <label for="new-password">Current password</label>
      <input v-model="currentPassword" type="password" name="new-password" />
    </div>
    <div>
      <label for="new-password">New password</label>
      <input v-model="newPassword" type="password" name="new-password" />
    </div>
    <div>
      <label for="confirm-password">Confirm password</label>
      <input
        v-model="confirmPassword"
        type="password"
        name="confirm-password"
      />
    </div>
  </the-form-section>
  <the-form-section :on-submit="openDeleteAccountConfirm">
    <template #submit-button>
      <div class="flex">
        <button
          type="submit"
          class="bg-orange-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-orange-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500"
        >
          Delete my account
        </button>
      </div>
    </template>
  </the-form-section>
  <ModalsContainer />
</template>

<script setup lang="ts">
import { useEditUser } from "~/composables/dbActions";
import { ModalsContainer, useModal } from "vue-final-modal";
import ModalConfirmPlainCss from "../components/ModalConfirmPlainCss.vue";

const userInfo = await getCurrentUser();

const username = ref(userInfo.username);
const firstname = ref(userInfo.firstname);
const lastname = ref(userInfo.lastname);

const currentPassword = ref("");
const newPassword = ref("");
const confirmPassword = ref("");

const { open: openDeleteAccountConfirm, close: closeDeleteAccountConfirm } =
  useModal({
    component: ModalConfirmPlainCss,
    attrs: {
      title:
        "Do you want to delete the account? It will be removed permanently.",
      onConfirm() {
        deleteUser();
        closeDeleteAccountConfirm();
      },
      onClose() {
        closeDeleteAccountConfirm();
      },
    },
    slots: {
      default: "",
    },
  });

const editPassword = async () => {
  const userData = { oldPassword: currentPassword.value, newPassword: newPassword.value };
  const userDataValid = validatePassword(userData.oldPassword) && validatePassword(userData.newPassword)
  if (userDataValid.error) {
    alert(userDataValid.error.message);
    return;
  }
  useEditUser(
    userInfo._id,
    userData,
    (res) => {
      if (res.status === 200) {
        alert("Password updated");
      } else {
        alert("Error occured");
      }
    }
  );
};

const editUser = async () => {
  const userData = {
    username: username.value,
    firstname: firstname.value,
    lastname: lastname.value,
  };
  const userDataValid = validateUserData(userData);
  if (userDataValid.error) {
    alert(userDataValid.error.message);
    return;
  }
  useEditUser(userInfo._id, userData, (res) => {
    if (res.status === 200) {
      alert("Information updated");
    } else {
      alert("Error occured");
    }
  });
};

const deleteUser = async () => useDeleteUser(userInfo._id);

onMounted(async () => {
  console.log(userInfo);
});
</script>

<style scoped>
label {
  display: inline-block;
  width: 4rem;
  margin-right: 4rem;
  font-size: large;
}

input {
  height: 2.4rem;
  padding: 0 0.5rem;
}
</style>
