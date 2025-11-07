import { type Ref, ref } from "vue";

export function useSort<T>(items: Ref<T[]>) {
  const sortKey = ref<string | null>(null);
  const sortOrder = ref<"asc" | "desc">("asc");

  const sortBy = (key: string) => {
    if (sortKey.value === key) {
      sortOrder.value = sortOrder.value === "asc" ? "desc" : "asc";
    } else {
      sortKey.value = key;
      sortOrder.value = "asc";
    }

    // ✅ ref 내부 데이터 재할당 (반응성 유지)
    items.value = [...items.value].sort((a: any, b: any) => {
      const A = a[key];
      const B = b[key];

      if (A == null) return 1;
      if (B == null) return -1;

      // 문자열/숫자/날짜 구분
      if (typeof A === "string" && typeof B === "string") {
        return sortOrder.value === "asc"
          ? A.localeCompare(B)
          : B.localeCompare(A);
      }
      return sortOrder.value === "asc" ? A - B : B - A;
    });
  };

  return {
    sortKey,
    sortOrder,
    sortBy,
  };
}
