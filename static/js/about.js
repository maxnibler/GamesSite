// This will be the object that will contain the Vue attributes
// and be used to initialize it.
let app = {};

// Given an empty app object, initializes it filling its attributes,
// creates a Vue instance, and then initializes the Vue instance.
let init = (app) => {

    // This is the Vue data.
    app.data = {
        textblock:"",
        logged_in:false,
        editing:false,
        manager:false,
        title:"About Us",
    };

    app.enumerate = (a) => {
        // This adds an _idx field to each element of the array.
        let k = 0;
        a.map((e) => {e._idx = k++;});
        return a;
    };

    app.toggle_edit = function () {
        app.vue.editing = !app.vue.editing;
    }

    app.update_blurb = function (tag) {
        axios.post(update_blurb_url, {
            body: app.vue.textblock,
            tag: tag,
            title: app.vue.title,
        }).then(function (response) {
            app.toggle_edit();
        })
    }

    app.check_admin = function () {
    }

    app.methods = {
        update_blurb: app.update_blurb,
        toggle_edit: app.toggle_edit,
        check_admin: app.check_admin,
    };

    // This creates the Vue instance.
    app.vue = new Vue({
        el: "#vue-target",
        data: app.data,
        methods: app.methods
    });

    app.init = () => {
        // Do any initializations (e.g. networks calls) here.
        app.vue.textblock = about_text;
        axios.get(check_admin_url).then(function (response) {
            if (response.data.admin > 1){
                app.vue.manager = true;
            }
        });
    };

    // Call to the initializer.
    app.init();
};

// This takes the (empty) app object, and initializes it,
// putting all the code i
init(app);
