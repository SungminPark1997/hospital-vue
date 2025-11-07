<template>
  <div class="table-responsive">
    <table class="table table-hover align-middle text-center">
      <thead class="table-light">
        <tr>
          <th @click="$emit('sort', 'id')" style="cursor: pointer">
            ID
            <BIconCaretUpFill
              v-if="sortKey === 'id' && sortOrder === 'ASC'"
              class="ms-1"
            />
            <BIconCaretDownFill
              v-if="sortKey === 'id' && sortOrder === 'DESC'"
              class="ms-1"
            />
          </th>

          <th @click="$emit('sort', 'biz_name')" style="cursor: pointer">
            병원명
            <BIconCaretUpFill
              v-if="sortKey === 'biz_name' && sortOrder === 'ASC'"
              class="ms-1"
            />
            <BIconCaretDownFill
              v-if="sortKey === 'biz_name' && sortOrder === 'DESC'"
              class="ms-1"
            />
          </th>

          <th @click="$emit('sort', 'biz_type')" style="cursor: pointer">
            병원종류
            <i
              v-if="sortKey === 'biz_type'"
              :class="
                sortOrder === 'ASC'
                  ? 'bi bi-caret-up-fill'
                  : 'bi bi-caret-down-fill'
              "
              class="ms-1"
            ></i>
          </th>

          <th
            @click="$emit('sort', 'detail_status_name')"
            style="cursor: pointer"
          >
            상태
            <i
              v-if="sortKey === 'detail_status_name'"
              :class="
                sortOrder === 'ASC'
                  ? 'bi bi-caret-up-fill'
                  : 'bi bi-caret-down-fill'
              "
              class="ms-1"
            ></i>
          </th>

          <th @click="$emit('sort', 'tel')" style="cursor: pointer">
            전화번호
            <i
              v-if="sortKey === 'tel'"
              :class="
                sortOrder === 'ASC'
                  ? 'bi bi-caret-up-fill'
                  : 'bi bi-caret-down-fill'
              "
              class="ms-1"
            ></i>
          </th>

          <th @click="$emit('sort', 'road_addr')" style="cursor: pointer">
            도로명 주소
            <i
              v-if="sortKey === 'road_addr'"
              :class="
                sortOrder === 'ASC'
                  ? 'bi bi-caret-up-fill'
                  : 'bi bi-caret-down-fill'
              "
              class="ms-1"
            ></i>
          </th>

          <th @click="$emit('sort', 'created_at')" style="cursor: pointer">
            등록일
            <i
              v-if="sortKey === 'created_at'"
              :class="
                sortOrder === 'ASC'
                  ? 'bi bi-caret-up-fill'
                  : 'bi bi-caret-down-fill'
              "
              class="ms-1"
            ></i>
          </th>

          <th @click="$emit('sort', 'updated_at')" style="cursor: pointer">
            수정일
            <i
              v-if="sortKey === 'updated_at'"
              :class="
                sortOrder === 'ASC'
                  ? 'bi bi-caret-up-fill'
                  : 'bi bi-caret-down-fill'
              "
              class="ms-1"
            ></i>
          </th>

          <th>삭제</th>
        </tr>
      </thead>

      <tbody>
        <tr
          v-for="h in hospitals"
          :key="h.id"
          @click="$emit('select', h)"
          style="cursor: pointer"
        >
          <td>{{ h.id }}</td>
          <td class="fw-semibold">{{ h.bizName }}</td>
          <td>{{ h.bizType }}</td>
          <td>
            <span
              class="badge"
              :class="{
                'bg-success': h.detailStatusName === '영업중',
                'bg-secondary': h.detailStatusName !== '영업중',
              }"
            >
              {{ h.detailStatusName || "-" }}
            </span>
          </td>
          <td>{{ h.tel || "-" }}</td>
          <td class="text-start">
            {{ h.roadAddr || h.lotAddr || "주소 없음" }}
          </td>
          <td>{{ formatDate(h.createdAt) }}</td>
          <td>{{ formatDate(h.updatedAt) }}</td>
          <td>
            <button
              class="btn btn-outline-danger btn-sm"
              @click.stop="$emit('delete', h.id)"
            >
              삭제
            </button>
          </td>
        </tr>

        <tr v-if="!isLoading && hospitals.length === 0">
          <td colspan="9" class="text-muted py-4">검색 결과가 없습니다.</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { formatDate } from "../utils/date";
import { BIconCaretDownFill, BIconCaretUpFill } from "bootstrap-icons-vue";
import type { Hospital } from "../api/hospitalApi";

defineProps<{
  hospitals: Hospital[];
  isLoading: boolean;
  sortKey: string;
  sortOrder: string;
}>();

defineEmits<{
  (e: "sort", key: string): void;
  (e: "select", hospital: Hospital): void;
  (e: "delete", id: number): void;
}>();
</script>
