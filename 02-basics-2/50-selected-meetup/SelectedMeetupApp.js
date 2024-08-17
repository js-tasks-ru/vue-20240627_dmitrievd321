import { defineComponent, ref, watchEffect } from 'vue'
import { getMeetup } from './meetupsService.ts'



export default defineComponent({
  name: 'SelectedMeetupApp',

  setup() {

    const meetupId = ref(1);
    const title = ref(null);

    const radioArr = ['1', '2', '3', '4', '5'];

    function prev() {
      meetupId.value--;
    }

    function next() {
      meetupId.value++;
    }


    watchEffect(async () => {
      try {
        const res = await getMeetup(meetupId.value);
        title.value = res.title;
      } catch (error) {
        console.error(error)
      }
    })

    return {
      title,
      meetupId,
      radioArr,
      prev,
      next
    }
  },


  template: `
    <div class="meetup-selector">
      <div class="meetup-selector__control">
        <button class="button button--secondary" type="button" :disabled="meetupId < 2" @click="prev">Предыдущий</button>

        <div class="radio-group" role="radiogroup">
          <div class="radio-group__button" v-for="(item, idx) in radioArr">
            <input
              :id="\`meetup-id-\${idx + 1}\`"
              class="radio-group__input"
              type="radio"
              name="meetupId"
              :value="item"
              v-model="meetupId"
            />
            <label :for="\`meetup-id-\${idx + 1}\`" class="radio-group__label">{{ idx + 1 }}</label>
          </div>
        </div>

        <button class="button button--secondary" type="button" :disabled="meetupId > 4" @click="next">Следующий</button>
      </div>

      <div class="meetup-selector__cover">
        <div class="meetup-cover">
          <h1 class="meetup-cover__title">{{ title }}</h1>
        </div>
      </div>

    </div>
  `,

  // Условие

  // template: `
  //   <div class="meetup-selector">
  //     <div class="meetup-selector__control">
  //       <button class="button button--secondary" type="button" disabled>Предыдущий</button>

  //       <div class="radio-group" role="radiogroup">
  //         <div class="radio-group__button">
  //           <input
  //             id="meetup-id-1"
  //             class="radio-group__input"
  //             type="radio"
  //             name="meetupId"
  //             value="1"
  //           />
  //           <label for="meetup-id-1" class="radio-group__label">1</label>
  //         </div>
  //         <div class="radio-group__button">
  //           <input
  //             id="meetup-id-2"
  //             class="radio-group__input"
  //             type="radio"
  //             name="meetupId"
  //             value="2"
  //           />
  //           <label for="meetup-id-2" class="radio-group__label">2</label>
  //         </div>
  //         <div class="radio-group__button">
  //           <input
  //             id="meetup-id-3"
  //             class="radio-group__input"
  //             type="radio"
  //             name="meetupId"
  //             value="3"
  //           />
  //           <label for="meetup-id-3" class="radio-group__label">3</label>
  //         </div>
  //         <div class="radio-group__button">
  //           <input
  //             id="meetup-id-4"
  //             class="radio-group__input"
  //             type="radio"
  //             name="meetupId"
  //             value="4"
  //           />
  //           <label for="meetup-id-4" class="radio-group__label">4</label>
  //         </div>
  //         <div class="radio-group__button">
  //           <input
  //             id="meetup-id-5"
  //             class="radio-group__input"
  //             type="radio"
  //             name="meetupId"
  //             value="5"
  //           />
  //           <label for="meetup-id-5" class="radio-group__label">5</label>
  //         </div>
  //       </div>

  //       <button class="button button--secondary" type="button">Следующий</button>
  //     </div>

  //     <div class="meetup-selector__cover">
  //       <div class="meetup-cover">
  //         <h1 class="meetup-cover__title">Some Meetup Title</h1>
  //       </div>
  //     </div>

  //   </div>
  // `,
})
