<template>
    <div class="sys-page">
        <app-title :title=title></app-title>

    </div>
</template>

<script>
export default {
    name: 'comPageResDetail',
    data() {
        return {
            title: "资源组详情",
            resourceData: {},
            id: "",
            type: 0
        }
    },
    methods: {
        getData() {
            let url = '';
            switch (this.type) {
                case 0:
                    url = `/api/resource/resgroup?id=${this.id}`;
                    break;
                case 1:
                    url = `/api/resource/resource_manager?id=${this.id}`;
                    break;
                case 2:
                    url = `/api/resource/subresgroup?id=${this.id}`;
                    break;
            }
            fetch(url).then(res => {
                return res.json();     //返回promise对象
            }).then(response => {
                console.log("response:", response);
                if (response.result === 1) {
                    this.resourceData = response.data.rows[0];
                }
            }).catch(reason => {
                console.log("reason:", reason);
            });
        }
    },
    mounted() {
        this.id = this.$route.params.id;
        this.type = this.$route.params.type;
        console.log("this.$route.params.id:", this.id);
        console.log("this.$route.params.type:", this.type);
        switch (this.type) {
            case 0:
                this.title = "资源组详情";
                break;
            case 1:
                this.title = "资源详情";
                break;
            case 2:
                this.title = "子资源详情";
                break;
        }
        this.getData();
    }
}
</script>
