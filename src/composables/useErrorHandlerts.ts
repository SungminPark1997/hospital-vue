import { ref } from "vue";

export function useErrorHandler() {
  const error = ref("");

  const throwError = (err: unknown, msg = "오류가 발생했습니다.") => {
    console.error(err);
    error.value = msg;
  };

  return { error, throwError };
}
