import { Component, Vue } from "vue-property-decorator";

@Component
export default class HeaderComponent extends Vue {
  theme = "";

  created() {
    const theme = window.localStorage.getItem("theme");
    this.setTheme(theme);
  }
  toggleTheme(checked: boolean) {
    const theme = checked ? "dark" : "light";
    this.setTheme(theme);
    window.localStorage.setItem("theme", theme);
  }

  setTheme(theme: string | null) {
    this.theme = theme || "dark";
    document.documentElement.setAttribute("data-theme", this.theme);
  }
}
