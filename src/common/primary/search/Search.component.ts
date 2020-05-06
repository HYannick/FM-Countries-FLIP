import { Component, Vue } from "vue-property-decorator";

@Component
export default class SearchComponent extends Vue {
  public query = "";

  setQuery(query: string) {
    this.query = query;
  }

  sendQuery() {
    this.$emit("query", this.query);
  }
}
