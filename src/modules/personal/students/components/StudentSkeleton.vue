<template>
  <div class="row q-col-gutter-y-md">
    <div class="col-12">
      <app-skeleton-title />
    </div>
    <div class="col-12">
      <app-skeleton-table />
    </div>
  </div>
</template>
<script>
import { defineComponent } from 'vue';
import AppSkeletonTitle from 'src/shared/components/AppSkeletonTitle.vue';
import AppSkeletonTable from 'src/shared/components/AppSkeletonTable.vue';
export default defineComponent({
  name: 'StudentSkeleton',
  components: {
    AppSkeletonTitle,
    AppSkeletonTable,
  },
});
</script>
