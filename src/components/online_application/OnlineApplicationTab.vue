<template>
  <div class="master_container">
    <div class="application_container container_box_shadow flex-column">
      <form>
        <div class="inner_block flex-row">
          <div class="left_side flex-column">
            <h2 class="title_1">
              {{ $t("online_application_tab.online_application") }}
            </h2>

            <div class="label_input_block">
              <label for="institution_name">{{
                $t("online_application_tab.institution_name")
              }}</label>
              <div
                :class="`input_wrapper ${validation_obj.corpname.val_status}`"
              >
                <input
                  v-model="payload_obj.corpname"
                  type="text"
                  name=""
                  id="institution_name"
                />
                <span class="validation_msg">{{
                  validation_obj.corpname.val_msg
                }}</span>
                <ExclamationCircle />
              </div>
            </div>

            <div class="label_input_block">
              <label for="cargo_loading_permission_id">{{
                $t("online_application_tab.load_permission_id")
              }}</label>
              <div
                :class="`input_wrapper ${validation_obj.permission_number.val_status}`"
              >
                <input
                  v-model="payload_obj.permission_number"
                  type="text"
                  name=""
                  id="cargo_loading_permission_id"
                />
                <span class="validation_msg">{{
                  validation_obj.permission_number.val_msg
                }}</span>
                <ExclamationCircle />
              </div>
            </div>

            <div class="label_input_block">
              <label for="cmr_id">{{
                $t("online_application_tab.cmr_id")
              }}</label>
              <div
                :class="`input_wrapper ${validation_obj.cmr_number.val_status}`"
              >
                <input
                  v-model="payload_obj.cmr_number"
                  type="text"
                  name=""
                  id="cmr_id"
                />
                <span class="validation_msg">{{
                  validation_obj.cmr_number.val_msg
                }}</span>
                <ExclamationCircle />
              </div>
            </div>

            <hr />
            <h4 class="title_2">
              {{ $t("online_application_tab.responsible.title") }}
            </h4>

            <div class="label_input_block">
              <label for="assigned_official_fullname">{{
                $t("online_application_tab.responsible.name")
              }}</label>
              <div
                :class="`input_wrapper ${validation_obj.fullname.val_status}`"
              >
                <input
                  v-model="payload_obj.fullname"
                  type="text"
                  name=""
                  id="assigned_official_fullname"
                />
                <span class="validation_msg">{{
                  validation_obj.fullname.val_msg
                }}</span>
                <ExclamationCircle />
              </div>
            </div>

            <div class="label_input_block">
              <label for="assigned_official_phone">{{
                $t("online_application_tab.responsible.phone")
              }}</label>
              <div :class="`input_wrapper ${validation_obj.phone.val_status}`">
                <input
                  v-model="payload_obj.phone"
                  type="text"
                  name=""
                  id="assigned_official_phone"
                />
                <span class="validation_msg">{{
                  validation_obj.phone.val_msg
                }}</span>
                <ExclamationCircle />
              </div>
            </div>

            <div class="label_input_block">
              <label for="assigned_official_email">{{
                $t("online_application_tab.responsible.email")
              }}</label>
              <div :class="`input_wrapper ${validation_obj.email.val_status}`">
                <input
                  v-model="payload_obj.email"
                  type="email"
                  name=""
                  id="assigned_official_email"
                />
                <span class="validation_msg">{{
                  validation_obj.email.val_msg
                }}</span>
                <ExclamationCircle />
              </div>
            </div>

            <h4 class="title_3">
              {{ $t("online_application_tab.responsible.title") }}
            </h4>

            <div class="label_input_block">
              <label for="director_fullname">{{
                $t("online_application_tab.responsible.director_name")
              }}</label>
              <div
                :class="`input_wrapper ${validation_obj.director_fullname.val_status}`"
              >
                <input
                  v-model="payload_obj.director_fullname"
                  type="text"
                  name=""
                  id="director_fullname"
                />
                <span class="validation_msg">{{
                  validation_obj.director_fullname.val_msg
                }}</span>
                <ExclamationCircle />
              </div>
            </div>
          </div>

          <div class="right_side flex-column">
            <h2 class="title">
              {{ $t("online_application_tab.additional_notes.title") }}
            </h2>

            <div class="file_input_container flex-row">
              <div class="text_block flex-column">
                <span>{{
                  $t("online_application_tab.additional_notes.file_1_desc")
                }}</span>
                <div class="file_input_row flex-row">
                  <label
                    for="file_1"
                    :class="`file_input_button flex-row ${this.validation_obj.yuztutma.val_status}`"
                  >
                    {{
                      $t("online_application_tab.additional_notes.attach_file")
                    }}
                    <svg
                      class="icon"
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M11.6792 8.03265L8.32044 11.3914"
                        stroke="inherit"
                        stroke-width="1.5"
                        stroke-linecap="round"
                      />
                      <path
                        d="M8.68031 5.75371L9.99977 4.43425C11.4572 2.97683 13.8202 2.97683 15.2776 4.43425V4.43425C16.735 5.89168 16.735 8.25464 15.2776 9.71206L13.9581 11.0315"
                        stroke="inherit"
                        stroke-width="1.5"
                        stroke-linecap="round"
                      />
                      <path
                        d="M11.3192 13.6704L9.99974 14.9898C8.54232 16.4472 6.17936 16.4472 4.72193 14.9898V14.9898C3.26451 13.5324 3.26451 11.1694 4.72193 9.71201L6.04139 8.39256"
                        stroke="inherit"
                        stroke-width="1.5"
                        stroke-linecap="round"
                      />
                    </svg>
                    <input
                      type="file"
                      id="file_1"
                      name="yuztutma"
                      @change="fileSelected"
                    />
                  </label>
                  <div
                    class="selected_file_name flex-row"
                    v-if="this.file_1_name"
                  >
                    <span>{{ this.file_1_name }}</span>
                    <svg
                      id="deselect_file_1"
                      @click="fileDeselected"
                      name="yuztutma"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="currentColor"
                      class="bi bi-x"
                      viewBox="0 0 16 16"
                    >
                      <path
                        d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"
                      />
                    </svg>
                  </div>
                </div>
              </div>
              <div class="image_block">
                <img src="" alt="" id="file_1_preview" />
              </div>
            </div>

            <hr />

            <div class="file_input_container flex-row">
              <div class="text_block flex-column">
                <span>
                  {{
                    $t("online_application_tab.additional_notes.file_2_desc")
                  }}
                </span>
                <div class="file_input_row flex-row">
                  <label
                    for="file_2"
                    :class="`file_input_button flex-row ${this.validation_obj.ygtyyarnama.val_status}`"
                  >
                    {{
                      $t("online_application_tab.additional_notes.attach_file")
                    }}
                    <svg
                      class="icon"
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M11.6792 8.03265L8.32044 11.3914"
                        stroke="inherit"
                        stroke-width="1.5"
                        stroke-linecap="round"
                      />
                      <path
                        d="M8.68031 5.75371L9.99977 4.43425C11.4572 2.97683 13.8202 2.97683 15.2776 4.43425V4.43425C16.735 5.89168 16.735 8.25464 15.2776 9.71206L13.9581 11.0315"
                        stroke="inherit"
                        stroke-width="1.5"
                        stroke-linecap="round"
                      />
                      <path
                        d="M11.3192 13.6704L9.99974 14.9898C8.54232 16.4472 6.17936 16.4472 4.72193 14.9898V14.9898C3.26451 13.5324 3.26451 11.1694 4.72193 9.71201L6.04139 8.39256"
                        stroke="inherit"
                        stroke-width="1.5"
                        stroke-linecap="round"
                      />
                    </svg>
                    <input
                      type="file"
                      name="ygtyyarnama"
                      id="file_2"
                      @change="fileSelected"
                    />
                  </label>
                  <div
                    class="selected_file_name flex-row"
                    v-if="this.file_2_name"
                  >
                    <span>{{ this.file_2_name }}</span>
                    <svg
                      id="deselect_file_2"
                      @click="fileDeselected"
                      name="ygtyyarnama"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="currentColor"
                      class="bi bi-x"
                      viewBox="0 0 16 16"
                    >
                      <path
                        d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"
                      />
                    </svg>
                  </div>
                </div>
              </div>
              <div class="image_block">
                <img src="" alt="" id="file_2_preview" />
              </div>
            </div>

            <hr />

            <div class="file_input_container flex-row">
              <div class="text_block flex-column">
                <span>
                  {{
                    $t("online_application_tab.additional_notes.file_3_desc")
                  }}
                </span>
                <div class="file_input_row flex-row">
                  <label
                    for="file_3"
                    :class="`file_input_button flex-row ${this.validation_obj.dowlet_sanaw.val_status}`"
                  >
                    {{
                      $t("online_application_tab.additional_notes.attach_file")
                    }}
                    <svg
                      class="icon"
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M11.6792 8.03265L8.32044 11.3914"
                        stroke="inherit"
                        stroke-width="1.5"
                        stroke-linecap="round"
                      />
                      <path
                        d="M8.68031 5.75371L9.99977 4.43425C11.4572 2.97683 13.8202 2.97683 15.2776 4.43425V4.43425C16.735 5.89168 16.735 8.25464 15.2776 9.71206L13.9581 11.0315"
                        stroke="inherit"
                        stroke-width="1.5"
                        stroke-linecap="round"
                      />
                      <path
                        d="M11.3192 13.6704L9.99974 14.9898C8.54232 16.4472 6.17936 16.4472 4.72193 14.9898V14.9898C3.26451 13.5324 3.26451 11.1694 4.72193 9.71201L6.04139 8.39256"
                        stroke="inherit"
                        stroke-width="1.5"
                        stroke-linecap="round"
                      />
                    </svg>
                    <input
                      type="file"
                      name="dowlet_sanaw"
                      required
                      id="file_3"
                      @change="fileSelected"
                    />
                  </label>
                  <div
                    class="selected_file_name flex-row"
                    v-if="this.file_3_name"
                  >
                    <span>{{ this.file_3_name }}</span>
                    <svg
                      id="deselect_file_3"
                      @click="fileDeselected"
                      name="dowlet_sanaw"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="currentColor"
                      class="bi bi-x"
                      viewBox="0 0 16 16"
                    >
                      <path
                        d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"
                      />
                    </svg>
                  </div>
                </div>
              </div>
              <div class="image_block">
                <img src="" alt="" id="file_3_preview" />
              </div>
            </div>
          </div>
        </div>
        <div class="submit_button flex-row">
          <button class="button-orange" @click.prevent="payloadSubmit">
            {{ $t("online_application_tab.submit_button") }}
          </button>
        </div>
      </form>
    </div>
    <VideoComponent />
    <div class="video_container flex-row">
      <span class="watch_text">{{
        $t("online_application_tab.pdf.title")
      }}</span>
      <a
        href="/static_files/application_letter.pdf"
        download="yuztutma_nusgasy.pdf"
        class="watch_button button-orange"
        >{{ $t("online_application_tab.pdf.download_button") }}</a
      >
    </div>
  </div>
  <PopupWindow
    v-if="this.$store.state.popupShow"
    :title="popupText.current.title"
    :message="popupText.current.message"
    :buttonText="popupText.current.buttonText"
  />
</template>

<script>
import ExclamationCircle from "@/components/icons/ExclamationCircle.vue";
import PopupWindow from "@/components/online_application/PopupWindow.vue";
import VideoComponent from "@/components/online_application/VideoComponent.vue";

export default {
  components: {
    ExclamationCircle,
    PopupWindow,
    VideoComponent,
  },
  data() {
    return {
      file_1_name: "",
      file_2_name: "",
      file_3_name: "",

      payload_obj: {
        corpname: "",
        cmr_number: "",
        permission_number: "",
        fullname: "",
        phone: "",
        email: "",
        director_fullname: "",
        action: "submit",

        yuztutma: {},
        ygtyyarnama: {},
        dowlet_sanaw: {},
      },
      emptyPayload: {
        corpname: "",
        cmr_number: "",
        permission_number: "",
        fullname: "",
        phone: "",
        email: "",
        director_fullname: "",
        action: "submit",

        yuztutma: {},
        ygtyyarnama: {},
        dowlet_sanaw: {},
      },
      validation_obj: {
        corpname: { val_status: "", val_msg: "" },
        cmr_number: { val_status: "", val_msg: "" },
        permission_number: { val_status: "", val_msg: "" },
        fullname: { val_status: "", val_msg: "" },
        phone: { val_status: "", val_msg: "" },
        email: { val_status: "", val_msg: "" },
        director_fullname: { val_status: "", val_msg: "" },
        yuztutma: { val_status: "", val_msg: "" },
        ygtyyarnama: { val_status: "", val_msg: "" },
        dowlet_sanaw: { val_status: "", val_msg: "" },
      },
      popupText: {
        success: {
          title: "online_application_tab.success.title",
          message: "online_application_tab.success.message",
          buttonText: "online_application_tab.success.buttonText",
        },
        failure: {
          title: "online_application_tab.failure.title",
          message: "online_application_tab.failure.message",
          buttonText: "online_application_tab.failure.buttonText",
        },
        current: {
          title: "",
          message: "",
          buttonText: "",
        },
        unsupportedFormat: {
          title: "online_application_tab.unsupportedFormat.title",
          message: "online_application_tab.unsupportedFormat.message",
          buttonText: "online_application_tab.unsupportedFormat.buttonText",
        },
        fileSizeExceeded: {
          title: "online_application_tab.fileSizeExceeded.title",
          message: "online_application_tab.fileSizeExceeded.message",
          buttonText: "online_application_tab.fileSizeExceeded.buttonText",
        },
      },

      imageTypes: [
        "image/jpg",
        "image/jpeg",
        "image/png",
        "image/bmp",
        "image/gif",
        "image/svg",
        "image/webp",
        "application/pdf",
      ],
    };
  },
  mounted() {
    this.$store.state.popupShow = false;
    if (!this.$store.state.authenticated) {
      this.$router.push({ name: "login_page" });
    }
  },
  methods: {
    fileSelected(e) {
      if (e.target.files.length) {
        if (
          this.imageTypes.includes(e.target.files[0].type) &&
          e.target.files[0].size / 1000 < 7168
        ) {
          this[e.target.id + "_name"] = e.target.files[0].name;
          this.payload_obj[e.target.name] = e.target.files[0];
          document.getElementById(`${e.target.id}_preview`).src =
            URL.createObjectURL(e.target.files[0]);
        } else if (!this.imageTypes.includes(e.target.files[0].type)) {
          this.popupText.current = this.popupText.unsupportedFormat;
          this.$store.state.popupShow = true;
        } else if (e.target.files[0].size / 1000 >= 7168) {
          this.popupText.current = this.popupText.fileSizeExceeded;
          this.$store.state.popupShow = true;
        }
      }
    },
    fileDeselected(e) {
      try {
        document.getElementById(`${e.target.id.slice(9)}`).value = null;
        this[e.target.id.slice(9) + "_name"] = "";
        this.payload_obj[e.target.attributes.name.value] = {};
        document.getElementById(`${e.target.id.slice(9)}_preview`).src = "";
      } catch (error) {
        console.error(error);
      }
    },
    deselectAllFiles() {
      ["file_1_name", "file_2_name", "file_3_name"].forEach((key) => {
        this[key] = "";
      });
      ["file_1_preview", "file_2_preview", "file_3_preview"].forEach((key) => {
        document.getElementById(key).src = "";
      });
    },
    payloadSubmit() {
      this.$store.state.preLoader = true;

      Object.keys(this.validation_obj).forEach((key) => {
        this.validation_obj[key].val_status = "";
        this.validation_obj[key].val_msg = "";
      });

      window.axios
        .post(
          this.$store.state.backendRoutes.onlineApplicationTab,
          this.payload_obj,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        )
        .then((res) => {
          if (res.data.status == "success") {
            this.popupText.current = this.popupText.success;
            this.payload_obj = this.emptyPayload;
            this.deselectAllFiles();
          } else if (res.data.status == "failure") {
            this.popupText.current = this.popupText.failure;
          }
          this.$store.state.popupShow = true;
        })
        .catch((res) => {
          if (
            res.response.status == 422 &&
            res.response.statusText == "Unprocessable Content"
          ) {
            Object.keys(res.response.data.errors).forEach((key) => {
              this.validation_obj[key].val_status = "is_invalid";
              this.validation_obj[key].val_msg =
                res.response.data.errors[key][0];
            });
          } else {
            console.error(res);
          }
        })
        .then()
        .catch(this.$store.state.axiosCatch)
        .finally(() => {
          this.$store.state.preLoader = false;
        });
    },
  },
};
</script>
