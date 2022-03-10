var vm = new Vue({
    el: '#app',
    data() {
        return {
            loggedIn: false,
            userData: {

            },
            pathApi: "./api",
            loginData: {
                email: "",
                password: "",
            },
            registerData: {
                nachname: "",
                vorname: "",
                geburtsdatum: "",
                bio: "",
                email: "", 
                username: "", 
                password: ""
            },
            postsForMe: [],
            storysForMe: [],
            searchQuery: "",
            searchedPosts: [],
            searchedUsers: [],
        }
    },
    watch: {
        searchQuery: function(){
            console.log("test");
            this.updateSearch(this.searchQuery);
        }
    },
    methods: {
        updateSearch(query) {
            var self = this; 
            console.log(query);
            self.searchPosts(query, function(res) {
                self.searchedPosts = res["Result"];
            });
            self.searchUser(query, function(res) {
                self.searchedUsers = res["Result"];
            });
        },

        load() {
            var self = this;
            self.getPostsForMe();
            self.getStorysForMe();
            self.updateSearch(self.searchQuery);
        },

        getStorysForMe() {
            var self = this;
            var id = this.getCookie("finstagram.UserId");
            var key = this.getCookie("finstagram.AuthKey");        
            self.getStorysFromFollowings(id, function(res) {
                self.storysForMe = res["Data"]
            })
        },

        getPostsForMe() {
            var self = this;
            var id = this.getCookie("finstagram.UserId");
            var key = this.getCookie("finstagram.AuthKey");
            self.getPostsFromFollowing(id, key, function(res) {
                self.postsForMe = res["Result"];
                console.log(res["Result"]);
            });
        },

        checkLogin() {
            var self = this;
            if (this.getCookie("finstagram.UserId") != undefined && this.getCookie("finstagram.AuthKey") != undefined) {
                var id = this.getCookie("finstagram.UserId");
                var key = this.getCookie("finstagram.AuthKey");
                this.getUser(id, key, function(res) {
                    console.log(res["Found"]);
                    if (res["Found"]) {
                        self.loggedIn = true;
                        self.userData = res.Data;
                        console.log(res["Query"]);
                        self.load();
                    }
                }) 
            }
        },

        loginUser() {
            var self = this;
            var email = this.loginData.email;
            var password = this.loginData.password;
            this.getLogin(email, password, function(res) {
                if (res["Found"]) {
                    self.loggedIn = true;
                    self.userData = res["Data"];
                    self.setCookie("finstagram.UserId", self.userData["ID"]);
                    self.setCookie("finstagram.AuthKey", self.userData["AuthCode"]);
                    console.log(res["Query"]);
                    self.load();
                }
            });
        },

        registerUser() {
            var self = this;
            console.log(this.registerData);
            this.createUser(this.registerData["nachname"], this.registerData["vorname"], this.registerData["geburtsdatum"], this.registerData["bio"], this.registerData["email"], this.registerData["username"], this.registerData["password"], function(res) {
                self.getUser(res["Id"], res["AuthCode"], function(res) {
                    self.loggedIn = true;
                    self.userData = res["Data"];
                    self.setCookie("finstagram.UserId", self.userData["ID"]);
                    self.setCookie("finstagram.AuthKey", self.userData["AuthCode"]);
                    self.load();
                });
            });
        },

        /* Cookies */ 

        setCookie(cname, cvalue, exdays) {
            const d = new Date();
            d.setTime(d.getTime() + (exdays*24*60*60*1000));
            let expires = "expires="+ d.toUTCString();
            document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/;samesite=strict";
        },

        getCookie(cname) {
            let name = cname + "=";
            let decodedCookie = decodeURIComponent(document.cookie);
            let ca = decodedCookie.split(';');
            for(let i = 0; i <ca.length; i++) {
              let c = ca[i];
              while (c.charAt(0) == ' ') {
                c = c.substring(1);
              }
              if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
              }
            }
            return "";
          },


        /* FInstagram API Methodes: */
        getLogin(email, password, callback) {
            var req = new XMLHttpRequest();            
            req.open("GET", this.pathApi + "/get/user.php?Email=" + email + "&Password=" + password);
            req.setRequestHeader('X-Requested-With', 'XMLHttpRequest'); 
            req.setRequestHeader('Access-Control-Allow-Origin', '*');
            req.setRequestHeader('Access-Control-Allow-Headers', '*');
            req.send();
            req.onreadystatechange = function() {
                if (this.readyState == 4) {
                    var json = JSON.parse(this.responseText);
                    callback(json);
                }
            }
        },

        getUser(id, key, callback) {
            var req = new XMLHttpRequest();            
            req.open("GET", this.pathApi + "/get/user.php?ID=" + id + "&Key=" + key);
            req.setRequestHeader('X-Requested-With', 'XMLHttpRequest'); 
            req.setRequestHeader('Access-Control-Allow-Origin', '*');
            req.send();
            req.onreadystatechange = function() {
                if (this.readyState == 4) {
                    var json = JSON.parse(this.responseText);
                    callback(json);
                }
            }
        }, 

        getPostsFromUser(userId, callback) {
            var req = new XMLHttpRequest();
            req.open("GET", this.pathApi + "/get/postsFromUser.php?UserId=" + userId);
            req.setRequestHeader('X-Requested-With', 'XMLHttpRequest'); 
            req.setRequestHeader('Access-Control-Allow-Origin', '*');
            req.send();
            req.onreadystatechange = function() {
                if (this.readyState == 4) {
                    var json = JSON.parse(this.responseText);
                    console.log(json);
                    callback(json);
                }
            }
        },

        getPostsFromFollowing(userId, key, callback) {
            var req = new XMLHttpRequest();
            req.open("GET", this.pathApi + "/get/postsFromFollowings.php?ID=" + userId + "&Key=" + key);
            req.setRequestHeader('X-Requested-With', 'XMLHttpRequest'); 
            req.setRequestHeader('Access-Control-Allow-Origin', '*');
            req.send();
            req.onreadystatechange = function() {
                if (this.readyState == 4) {
                    var json = JSON.parse(this.responseText); 
                    console.log(json);
                    callback(json);
                }
            }
        }, 

        getUserLite(userId, callback) {
            var req = new XMLHttpRequest();
            req.open("GET", this.pathApi + "/get/userLite.php?ID=" + userId);
            req.setRequestHeader('X-Requested-With', 'XMLHttpRequest'); 
            req.setRequestHeader('Access-Control-Allow-Origin', '*');
            req.send();
            req.onreadystatechange = function() {
                if (this.readyState == 4) {
                    var json = JSON.parse(this.responseText); 
                    console.log(json);
                    callback(json);
                }
            }
        },

        getStory(storyId, callback) {
            var req = new XMLHttpRequest();
            req.open("GET", this.pathApi + "/get/story.php?ID=" + storyId);
            req.setRequestHeader('X-Requested-With', 'XMLHttpRequest'); 
            req.setRequestHeader('Access-Control-Allow-Origin', '*');
            req.send();
            req.onreadystatechange = function() {
                if (this.readyState == 4) {
                    var json = JSON.parse(this.responseText);
                    console.log(json);
                    callback(json);
                }
            }
        },

        getStorysFromFollowings(userId, callback) {
            var req = new XMLHttpRequest();
            req.open("GET", this.pathApi + "/get/storyFromFollowings.php?ID=" + userId);
            req.setRequestHeader('X-Requested-With', 'XMLHttpRequest'); 
            req.setRequestHeader('Access-Control-Allow-Origin', '*');
            req.send(); 
            req.onreadystatechange = function() {
                if (this.readyState == 4) {
                    var json = JSON.parse(this.responseText); 
                    console.log(json);
                    callback(json);
                }
            }
        },

        getStorysFromUser(userId, callback) {
            var req = new XMLHttpRequest();
            req.open("GET", this.pathApi + "/get/storyFromUser.php?ID=" + userId);
            req.setRequestHeader('X-Requested-With', 'XMLHttpRequest'); 
            req.setRequestHeader('Access-Control-Allow-Origin', '*');
            req.send();
            req.onreadystatechange = function() {
                if (this.readyState == 4) {
                    var json = JSON.parse(this.responseText); 
                    console.log(json);
                    callback(json);
                }
            }
        },

        createPost(key, id, type, bio, text, mediaLink, callback) {
            var data = new FormData();
            data.append("Key", key);
            data.append("ID", id);
            data.append("Type", type);
            data.append("Bio", bio);
            data.append("Text", text);
            data.append("MediaLink", mediaLink);
            var req = new XMLHttpRequest();
            req.open("POST", this.pathApi + "/create/post.php")
            req.setRequestHeader('X-Requested-With', 'XMLHttpRequest'); 
            req.setRequestHeader('Access-Control-Allow-Origin', '*');
            req.send();
            req.onreadystatechange = function() {
                if (this.readyState == 4) {
                    var json = JSON.parse(this.responseText); 
                    console.log(json);
                    callback(json);
                }
            }
        },

        createStory(key, id, type, text, mediaLink, mediaType, callback) {
            var req = new XMLHttpRequest();
            req.open("GET", this.pathApi + "/create/story.php?Key=" + key + "&ID=" + id + "&Type=" + type + "&Bio=" + bio + "&Text=" + text + "&MediaLink=" + mediaLink + "&MediaType=" + mediaType);
            req.setRequestHeader('X-Requested-With', 'XMLHttpRequest'); 
            req.setRequestHeader('Access-Control-Allow-Origin', '*');
            req.send();
            req.onreadystatechange = function() {
                if (this.readyState == 4) {
                    var json = JSON.parse(this.responseText);
                    console.log(json);
                    callback(json);
                }
            }
        },

        createUser(nachname, vorname, geburtsdatum, bio, email, username, password, callback) {
            var req = new XMLHttpRequest();
            req.open("GET", this.pathApi + "/create/user.php?Nachname=" + nachname + "&Vorname=" + vorname + "&Geburtsdatum=" + geburtsdatum + "&Bio=" + bio + "&Email=" + email + "&Username=" + username + "&Password=" + password);
            req.setRequestHeader('X-Requested-With', 'XMLHttpRequest'); 
            req.setRequestHeader('Access-Control-Allow-Origin', '*');
            req.send();
            req.onreadystatechange = function() {
                if (this.readyState == 4) {
                    var json = JSON.parse(this.responseText); 
                    console.log(json);
                    callback(json);
                }
            }
        },

        setFollowing(key, id, userId, state, callback) {
            var req = new XMLHttpRequest();
            req.open("GET", this.pathApi + "/set/following.php?Key=" + key + "&ID=" + id + "&UserId=" + userId + "&State=" + state);
            req.setRequestHeader('X-Requested-With', 'XMLHttpRequest'); 
            req.setRequestHeader('Access-Control-Allow-Origin', '*');
            req.send();
            req.onreadystatechange = function() {
                if (this.readyState == 4) {
                    var json = JSON.parse(this.responseText); 
                    console.log(json);
                    callback(json);
                }
            }
        },

        searchPosts(search, callback) {
            var req = new XMLHttpRequest();
            req.open("GET", this.pathApi + "/search/post.php?Search=" + search);
            req.setRequestHeader('X-Requested-With', 'XMLHttpRequest'); 
            req.setRequestHeader('Access-Control-Allow-Origin', '*');
            req.send();
            req.onreadystatechange = function() {
                if (this.readyState == 4) {
                    var json = JSON.parse(this.responseText);
                    console.log(json); 
                    callback(json);
                }
            }
        },

        searchUser(search, callback) {
            var req = new XMLHttpRequest();
            req.open("GET", this.pathApi + "/search/user.php?Search=" + search);
            req.setRequestHeader('X-Requested-With', 'XMLHttpRequest'); 
            req.setRequestHeader('Access-Control-Allow-Origin', '*');
            req.send();
            req.onreadystatechange = function() {
                if (this.readyState == 4) {
                    var json = JSON.parse(this.responseText);
                    console.log(json);
                    callback(json);
                }
            }
        },
    },
    async created(){
       this.checkLogin();
    },
});
