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
      <label for="new-password">New password</label>
      <input v-model="newPassword" type="password" name="new-password" />
    </div>
    <div>
      <label for="confirm-password">Confirm password</label>
      <input v-model="confirmPassword" type="password" name="confirm-password" />
    </div>
  </the-form-section>
  <the-form-section :on-submit="deleteUser">
    <template #submit-button>
      <div class="flex">
          <button type="submit" class="bg-orange-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-orange-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500">
            Delete my account
          </button>
        </div>
    </template>
  </the-form-section>
</template>

<script setup lang="ts">
import { useEditUser } from '~/composables/dbActions';

const userInfo = await getCurrentUser();

const username = ref(userInfo.username)
const firstname = ref(userInfo.firstname)
const lastname = ref(userInfo.lastname)
const newPassword = ref('')
const confirmPassword = ref('')

const editPassword = async () => useEditUser(userInfo._id, { password: newPassword.value })

const editUser = async () => useEditUser(userInfo._id, {
  username: username.value,
  firstname: firstname.value,
  lastname: lastname.value,
})

const deleteUser = async () => useDeleteUser(userInfo._id);

onMounted(async () => {
  console.log(userInfo);
});
</script>

<style scoped>
label {
  display: inline-block;
  width: 3rem;
  margin-right: 4rem;
  font-size: large;
}

input {
  height: 2.4rem;
  padding: 0 0.5rem;
}
</style>