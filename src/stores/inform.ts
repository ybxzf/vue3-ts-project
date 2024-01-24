import { ref, reactive, computed } from 'vue'
import { defineStore } from 'pinia'

export const useInformStore = defineStore(
  'store-inform',
  () => {
    const user = reactive<any>({
      name: 'ybxzf',
      age: 18,
      sex: "male",
      email: "xxx@xx.com"
    })
    const birth = computed(() => new Date().getFullYear() - user.age)
    function updateUserInfo(info: any) {
      user.name = info.name;
      user.age = info.age;
      user.sex = info.sex;
      user.email = info.email;
    }

    return { user, birth, updateUserInfo }
  })