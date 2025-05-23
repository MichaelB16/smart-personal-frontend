<template>
  <q-form ref="formDiet" @submit.prevent="saveDiet">
    <div class="row">
      <draggable class="col-12" @change="updateList" v-model="listDiet">
        <transition-group>
          <div
            class="col-12 q-mb-sm tw-border-2 tw-border-dashed q-px-sm q-py-sm"
            v-for="(item, index) in listDiet"
            :key="index"
          >
            <app-card bordered class="no-shadow">
              <q-card-section class="q-pa-none">
                <q-expansion-item icon="mdi-calendar" :label="item.day">
                  <template v-slot:header>
                    <q-item-section avatar>
                      <q-icon color="grey" size="20px" name="mdi-calendar" />
                    </q-item-section>
                    <q-item-section>
                      <b>{{ item.day }}</b>
                    </q-item-section>
                  </template>
                  <app-card>
                    <q-card-section class="q-pa-xs tw-bg-[#f5f5f5c9]">
                      <template v-if="item.meals.length">
                        <div
                          class="row full-width items-center q-col-gutter-x-sm tw-mb-1"
                          v-for="(meal, key) in item.meals"
                          :key="key"
                        >
                          <div class="col-12 q-mt-sm">
                            <fieldset>
                              <legend>
                                <q-chip color="primary" text-color="white">
                                  {{ meal.label }}
                                </q-chip>
                              </legend>
                              <div class="row q-col-gutter-y-sm">
                                <div
                                  class="row q-col-gutter-x-sm full-width items-center justify-between"
                                >
                                  <div class="col">
                                    <app-input
                                      bg-color="white"
                                      class="tw-text-[10px]"
                                      :rules="formRules()"
                                      v-model="
                                        listDiet[index].meals[key].description
                                      "
                                    >
                                      <template v-slot:prepend>
                                        <q-icon
                                          name="mdi-star"
                                          color="grey-8"
                                          size="15px"
                                        />
                                      </template>
                                    </app-input>
                                  </div>
                                  <div>
                                    <q-btn
                                      round
                                      @click="removeDiet(index, key)"
                                      size="xs"
                                      unelevated
                                      color="negative"
                                      icon="mdi-trash-can"
                                    />
                                  </div>
                                </div>
                              </div>
                            </fieldset>
                          </div>
                        </div>
                      </template>
                    </q-card-section>
                  </app-card>
                </q-expansion-item>
              </q-card-section>
            </app-card>
          </div>
        </transition-group>
      </draggable>

      <div class="col-12">
        <app-form-footer />
      </div>
    </div>
  </q-form>
</template>
<script lang="ts">
import { defineComponent, onMounted, reactive, ref, toRefs } from 'vue';
import { useStudentStore } from '../store/student.store';
import { formRules } from 'src/shared/utils';
import { VueDraggableNext } from 'vue-draggable-next';

export default defineComponent({
  name: 'FormDiet',
  components: {
    draggable: VueDraggableNext,
  },
  setup(props, { emit }) {
    const formDiet = ref();
    const studentStore = useStudentStore();
    const state = reactive({
      listDiet: [] as any[],
    });

    const days = [
      'Segunda-feira',
      'Terça-feira',
      'Quarta-feira',
      'Quinta-feira',
      'Sexta-feira',
      'Sábado',
      'Domingo',
    ];

    onMounted(() => {
      state.listDiet = studentStore.listDiet;
    });

    const updateList = () => {
      state.listDiet = state.listDiet.map((item, index) => {
        return {
          ...item,
          day: days[index],
        };
      });
    };

    const removeDiet = (index: number, key: number) => {
      state.listDiet[index].meals.splice(key, 1);
    };

    const saveDiet = () => {
      formDiet.value.validate().then(async (success: boolean) => {
        if (success) {
          await studentStore.SAVE_DIET({
            student_id: parseInt(studentStore.rowSelected.id),
            diet: JSON.stringify(state.listDiet),
          });
          emit('close');
        }
      });
    };

    return {
      formDiet,
      removeDiet,
      updateList,
      saveDiet,
      formRules,
      ...toRefs(state),
    };
  },
});
</script>
