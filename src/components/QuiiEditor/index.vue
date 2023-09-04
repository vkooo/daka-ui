<template>
    <div class="editor_wrap">
        <quill-editor v-model="content" :ref="refName" class="editor" :disabled="isDisabled" :options="editorOption"
            @blur="onEditorBlur" @focus="onEditorFocus" @change="onEditorChange" @input="updateValue"></quill-editor>
        <VkPicture ref="pictureRef" :maxCount="1" @selectImage="selectImage" />
    </div>
</template>
   
<script>
// 引入样式和quillEditor
import { quillEditor } from 'vue-quill-editor'
import "quill/dist/quill.core.css"; // import styles
import "quill/dist/quill.snow.css"; // for snow theme
import "quill/dist/quill.bubble.css"; // for bubble theme

// 工具栏配置项
const toolbarOptions = [
    // 加粗 斜体 下划线 删除线 -----['bold', 'italic', 'underline', 'strike']
    ['bold', 'italic', 'underline', 'strike'],
    // 引用  代码块-----['blockquote', 'code-block']
    ['blockquote', 'code-block'],
    // 1、2 级标题-----[{ header: 1 }, { header: 2 }]
    [{ header: 1 }, { header: 2 }],
    // 有序、无序列表-----[{ list: 'ordered' }, { list: 'bullet' }]
    [{ list: 'ordered' }, { list: 'bullet' }],
    // 上标/下标-----[{ script: 'sub' }, { script: 'super' }]
    [{ script: 'sub' }, { script: 'super' }],
    // 缩进-----[{ indent: '-1' }, { indent: '+1' }]
    [{ indent: '-1' }, { indent: '+1' }],
    // 文本方向-----[{'direction': 'rtl'}]
    [{ direction: 'rtl' }],
    // 字体大小-----[{ size: ['small', false, 'large', 'huge'] }]
    [{ size: ['small', false, 'large', 'huge'] }],
    // 标题-----[{ header: [1, 2, 3, 4, 5, 6, false] }]
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    // 字体颜色、字体背景颜色-----[{ color: [] }, { background: [] }]
    [{ color: [] }, { background: [] }],
    // 字体种类-----[{ font: [] }]
    [{ font: [] }],
    // 对齐方式-----[{ align: [] }]
    [{ align: [] }],
    // 清除文本格式-----['clean']
    ['clean'],
    // 链接、图片、视频-----['link', 'image', 'video']
    ['image']
]

export default {
    components: {
        quillEditor
    },
    props: {
        value: {
            type: String,
            default: "",
        }
    },
    data() {
        return {
            refName: 'QuillEditor' + this._uid,
            timer: null,
            isDisabled: false,
            content: '',
            editorOption: {
                placeholder: '请输入正文',
                theme: 'snow',
                modules: {
                    toolbar: {
                        container: toolbarOptions,
                        handlers: {
                            image: (value) => {
                                if (value) {
                                    // 调用element的图片上传组件
                                    this.$refs.pictureRef.dialogVisible = true
                                } else {
                                    this.quill.format('image', false)
                                }
                            }
                        },
                    },
                }
            }
        }
    },
    methods: {
        // 失去焦点事件
        onEditorBlur(e) {
            // console.log('onEditorBlur: ', e)
        },
        // 获得焦点事件
        onEditorFocus(e) {
            // console.log('onEditorFocus: ', e)
        },
        // 内容改变事件
        onEditorChange(e) {
            // console.log('onEditorChange: ', e)
        },
        selectImage(data) {
            let quill = this.$refs[this.refName].quill
            let range = quill.selection.savedRange;
            if (!range) {
                this.$message.error('请将光标移至输入框内')
                return
            }
            // 插入图片到光标位置
            quill.insertEmbed(range.index, 'image', data.urls[0])
            quill.setSelection(range.index + 1);

            this.$forceUpdate()
        },
        updateValue() {
            if (this.timer) {
                clearTimeout(this.timer)
            }
            this.timer = setTimeout(() => {
                this.$emit('updateValue', this.content)
            }, 300)
        },
    },
    watch: {
        value: {
            handler: function(newValue, oldVal){
                this.content = newValue
            },
            deep: true,
            immediate: true
        }
    }
}
</script>
   
<style lang="scss" scoped>

.editor_wrap ::v-deep .editor {

line-height: normal !important;

height: 270px;

margin-bottom: 60px;

}

.editor_wrap ::v-deep .editor .ql-bubble .ql-editor a {

color: #136ec2;

}

.editor_wrap ::v-deep .editor img {

max-width: 720px;

margin:10px;

}

.editor_wrap ::v-deep .ql-snow .ql-color-picker .ql-picker-options {

padding: 3px 5px;

width: 192px;

}

.editor_wrap ::v-deep .ql-snow .ql-tooltip[data-mode="link"]::before {

content: "请输入链接地址:";

}

.editor_wrap ::v-deep .ql-snow .ql-tooltip.ql-editing a.ql-action::after {

border-right: 0px;

content: "保存";

padding-right: 0px;

}

.editor_wrap ::v-deep .ql-snow .ql-tooltip[data-mode="video"]::before {

content: "请输入视频地址:";

}

.editor_wrap ::v-deep .ql-snow .ql-picker.ql-size .ql-picker-label::before,

.editor_wrap ::v-deep .ql-snow .ql-picker.ql-size .ql-picker-item::before {

content: "14px";

}

.editor_wrap ::v-deep .ql-snow .ql-picker.ql-size .ql-picker-label[data-value="small"]::before,

.editor_wrap ::v-deep .ql-snow .ql-picker.ql-size .ql-picker-item[data-value="small"]::before {

content: "10px";

}

.editor_wrap ::v-deep .ql-snow .ql-picker.ql-size .ql-picker-label[data-value="large"]::before,

.editor_wrap ::v-deep .ql-snow .ql-picker.ql-size .ql-picker-item[data-value="large"]::before {

content: "18px";

}

.editor_wrap ::v-deep .ql-snow .ql-picker.ql-size .ql-picker-label[data-value="huge"]::before,

.editor_wrap ::v-deep .ql-snow .ql-picker.ql-size .ql-picker-item[data-value="huge"]::before {

content: "32px";

}

.editor_wrap ::v-deep .ql-snow .ql-picker.ql-header .ql-picker-label::before,

.editor_wrap ::v-deep .ql-snow .ql-picker.ql-header .ql-picker-item::before {

content: "文本";

}

.editor_wrap ::v-deep .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="1"]::before,

.editor_wrap ::v-deep .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="1"]::before {

content: "标题1";

}

.editor_wrap ::v-deep .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="2"]::before,

.editor_wrap ::v-deep .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="2"]::before {

content: "标题2";

}

.editor_wrap ::v-deep .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="3"]::before,

.editor_wrap ::v-deep .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="3"]::before {

content: "标题3";

}

.editor_wrap ::v-deep .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="4"]::before,

.editor_wrap ::v-deep .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="4"]::before {

content: "标题4";

}

.editor_wrap ::v-deep .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="5"]::before,

.editor_wrap ::v-deep .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="5"]::before {

content: "标题5";

}

.editor_wrap ::v-deep .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="6"]::before,

.editor_wrap ::v-deep .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="6"]::before {

content: "标题6";

}

.editor_wrap ::v-deep .ql-snow .ql-picker.ql-font .ql-picker-label::before,

.editor_wrap ::v-deep .ql-snow .ql-picker.ql-font .ql-picker-item::before {

content: "标准字体";

}

.editor_wrap ::v-deep .ql-snow .ql-picker.ql-font .ql-picker-label[data-value="serif"]::before,

.editor_wrap ::v-deep .ql-snow .ql-picker.ql-font .ql-picker-item[data-value="serif"]::before {

content: "衬线字体";

}

.editor_wrap ::v-deep .ql-snow .ql-picker.ql-font .ql-picker-label[data-value="monospace"]::before,

.editor_wrap ::v-deep .ql-snow .ql-picker.ql-font .ql-picker-item[data-value="monospace"]::before {

content: "等宽字体";

}
</style>