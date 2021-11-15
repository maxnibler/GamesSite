// This will be the object that will contain the Vue attributes
// and be used to initialize it.
let app = {};

// Given an empty app object, initializes it filling its attributes,
// creates a Vue instance, and then initializes the Vue instance.
let init = (app) => {

    // This is the Vue data.
    app.data = {
        logged_in:false,
        admin:false,
        admin_level:0,
        account_rows:[],
    };

    app.enumerate = (a) => {
        // This adds an _idx field to each element of the array.
        let k = 0;
        a.map((e) => {e._idx = k++;});
        return a;
    };

    app.get_accounts = function () {
        axios.get(
            get_accounts_url,
            {params: {permission_level: -1}}
        ).then(function (response) {
            app.vue.account_rows = app.enumerate(response.data.rows);
            console.log(app.vue.account_rows);
        });
    }

    app.methods = {

    };

    // This creates the Vue instance.
    app.vue = new Vue({
        el: "#vue-target",
        data: app.data,
        methods: app.methods
    });

    app.init = () => {
        // Do any initializations (e.g. networks calls) here.
        if (check_admin_url != undefined){
            axios.get(check_admin_url).then(function (response) {
                if (response.data.admin > 2){
                    app.vue.admin = true;
                    app.vue.admin_level = response.data.admin;
                }
            });
        }
        app.get_accounts();
    };

    // Call to the initializer.
    app.init();
};

// This takes the (empty) app object, and initializes it,
// putting all the code i
init(app);
