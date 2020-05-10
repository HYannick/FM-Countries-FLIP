import { Component, Prop, Vue } from 'vue-property-decorator';
import anime from 'animejs';
interface SelectOption {
  label: string;
  value: string
}
type SelectOptions = SelectOption[]
const toSelectOption = (options: string[]): SelectOptions => options.map((option) => ({
  label: option,
  value: option.toLowerCase()
}));

const setStaggeredGroupAnimation = (el: any, animParams: any) => {
  const delay = el.dataset.index * 50
  anime({
    ...animParams,
    delay
  })
}

@Component
export default class SelectComponent extends Vue {
  public selectedOption: SelectOption = {
    label: 'Filter by Region',
    value: '',
  };
  public selectOptions: SelectOptions = []

  @Prop({
    type: Array,
    default: []
  })
  options!: string[]

  isOpen: boolean = false;

  created() {
    this.selectOptions = toSelectOption(this.options);
  }

  change(value: string) {
    this.selectedOption = this.selectOptions.find((option) => option.value === value)!;
    this.$emit('change', this.selectedOption.value);
    this.closeOptions();
  }

  toggleOptions() {
    this.isOpen = !this.isOpen;
  }

  closeOptions() {
    this.isOpen = false;
  }

  beforeEnter(el: any) {
    el.style.transform = 'translateY(50px)'
    el.style.opacity = 0
  }

  enterContainer(el: any, done: () => void) {
    anime({
      targets: el,
      height: el.querySelector('li').getBoundingClientRect().height * this.options.length,
      opacity: 1,
      easing: "easeOutQuart",
      duration: 500,
      complete: done
    })
  }
  leaveContainer(el: any, done: () => void) {
    anime({
      targets: el,
      height: 0,
      opacity: 0,
      easing: "easeInQuart",
      duration: 400,
      complete: done
    })
    anime({
      targets: Array.from(el.querySelectorAll('li')),
      translateY: -50,
      easing: "easeInQuart",
      duration: 500,
      delay: anime.stagger(50),
    })
  }
  enter(el: any, done: () => void) {
    anime({
      targets: el,
      opacity: 1,
      translateY: 0,
      easing: "easeOutQuart",
      duration: 500,
      delay: el.dataset.index * 50,
      complete: () => {
        done();
        el.style.transition = 'background-color 0.3s';
      }
    })
  }
}
