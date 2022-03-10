var vm = new Vue({
    el: '#app',
    data() {
        return {
            pathApi: "../api",
            data: {}
        }
    },
    watch: {
      
    },
    methods: {
    
        load() {
            var self = this;
            const queryString = window.location.search;
            const urlParams = new URLSearchParams(queryString);
            var storyId = urlParams.get('id');
            self.getPost(storyId, function(res) {
                self.data = res["Data"];
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

        getPost(postId, callback) {
            var req = new XMLHttpRequest();
            req.open("GET", this.pathApi + "/get/post.php?ID=" + postId);
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
       this.load();
    },
});
