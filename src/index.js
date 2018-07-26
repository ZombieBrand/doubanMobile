import './index.css'

var app = {
        init: function() {
            this.$tab = $('footer>div')
            this.$panels = $('section')
            this.bind()
            top250.init()
            beimei.init()
            search.init()
        },
        bind: function() {
            var _this = this
            this.$tab.on('click', function() {
                $(this).addClass('active').siblings().removeClass('active')
                _this.$panels.eq($(this).index()).show().siblings().hide()
            })
        }
    }

    var top250 = {
        init: function() {
            this.$container = $('#top250')
            this.moveIndex = 0
            this.inFinish = false
            this.loading = false
            this.start()
            this.bind()
        },
        bind: function() {
            console.log('bind')
            var _this = this
            _this.start()
            _this.$container.scroll(function() {
                _this._throttle(_this.isToBottom(), 300)
            })
            // this.$container.scroll(function () {
            //     _this.start()
            // })
        },
        getData: function(callback) {
            console.log('getData')
            var _this = this
            if (this.loading) return
            this.loading = true
            this.$container.find('.loading').show()
            $.ajax({
                url: 'https://api.douban.com/v2/movie/top250',
                type: 'GET',
                dataType: 'jsonp',
                data: {
                    start: this.moveIndex,
                    count: 20
                }
            }).done(function(res) {
                _this.moveIndex += 20
                if (_this.moveIndex >= res.total) {
                    _this.inFinish = true
                }
                callback(res)
            }).fail(function() {
                console.log('失败')
            }).always(function() {
                _this.loading = false
                _this.$container.find('.loading').hide()
            })
        },
        start: function() {
            console.log('start')
            var _this = this
            this.getData(function(data) {
                _this.render(data)
            })
        },
        render: function(data) {
            var _this = this
            console.log('render')
            data.subjects.forEach(function(move, index) {
                console.log(move)
                var directorsArr = function(move) {
                    let arr = []
                    move.directors.forEach(function(move, index) {
                        arr[index] = move.name
                    })

                    return arr.join(" 丶 ")
                }
                var castsArr = function(move) {
                    let arr = []
                    move.casts.forEach(function(move, index) {
                        arr[index] = move.name
                    })
                    return arr.join(" 丶 ")
                }
                var template =
                    `<div class="item">
                                    <a href="#">
                                        <div class="cover">
                                            <img src=${move.images.medium} alt="">
                                        </div>
                                        <div class="detail">
                                            <h2 class="title">${move.title}</h2>
                                            <div class="extra"><span class="score">${move.rating.average}分</span> / ${move.collect_count}收藏</div>
                                            <div class="extra">${move.year} / ${move.genres.join('/')}</div>
                                            <div class="extra">导演: ${directorsArr(move)}</div>
                                            <div class="extra">主演: ${castsArr(move)}</div>
                                        </div>
                                    </a>
                                </div>`
                _this.$container.find('.container').append(template)
            })

        },
        isToBottom: function() {
            console.log('isToBottom')
            var _this = this
            if (this.$container.height() + this.$container.scrollTop() >= this.$container.find(
                    '.container')
                .height() - 100) {
                _this.start()
            }
        },
        _throttle: function(callback, delay) {
            var timer = null
            return function() {
                clearTimeout(timer)
                timer = setTimeout(function() {
                    if (timer) {
                        clearTimeout(timer)
                    }
                    callback()
                }, delay)
            }
        }

    }
    var beimei = {
        init: function() {
            this.$container = $('#beimei')
            this.moveIndex = 0
            this.inFinish = false
            this.loading = false
            this.start()
            this.bind()
        },
        bind: function() {
            console.log('bind')
            var _this = this
            _this.start()
            _this.$container.scroll(function() {
                _this._throttle(_this.isToBottom(), 300)
            })
            // this.$container.scroll(function () {
            //     _this.start()
            // })
        },
        getData: function(callback) {
            console.log('getData')
            var _this = this
            if (this.loading) return
            this.loading = true
            this.$container.find('.loading').show()
            $.ajax({
                url: 'https://api.douban.com/v2/movie/us_box',
                type: 'GET',
                dataType: 'jsonp',
            }).done(function(res) {
                console.log(res, 'beimei')
                _this.moveIndex += 20
                if (_this.moveIndex >= res.total) {
                    _this.inFinish = true
                }
                callback(res)
            }).fail(function() {
                console.log('失败')
            }).always(function() {
                _this.loading = false
                _this.$container.find('.loading').hide()
            })
        },
        start: function() {
            console.log('start')
            var _this = this
            this.getData(function(data) {
                _this.render(data)
            })
        },
        render: function(data) {
            var _this = this
            console.log('render')
            data.subjects.forEach(function(data, index) {
                let move = data.subject
                console.log(move)
                var directorsArr = function(move) {
                    let arr = []
                    move.directors.forEach(function(move, index) {
                        arr[index] = move.name
                    })

                    return arr.join(" 丶 ")
                }
                var castsArr = function(move) {
                    let arr = []
                    move.casts.forEach(function(move, index) {
                        arr[index] = move.name
                    })
                    return arr.join(" 丶 ")
                }
                var template =
                    `<div class="item">
                                    <a href="#">
                                        <div class="cover">
                                            <img src=${move.images.medium} alt="">
                                        </div>
                                        <div class="detail">
                                            <h2 class="title">${move.title}</h2>
                                            <div class="extra"><span class="score">${move.rating.average}分</span> / ${move.collect_count}收藏</div>
                                            <div class="extra">${move.year} / ${move.genres.join('/')}</div>
                                            <div class="extra">导演: ${directorsArr(move)}</div>
                                            <div class="extra">主演: ${castsArr(move)}</div>
                                        </div>
                                    </a>
                                </div>`
                _this.$container.find('.container').append(template)
            })

        },
        isToBottom: function() {
            console.log('isToBottom')
            var _this = this
            if (this.$container.height() + this.$container.scrollTop() >= this.$container.find(
                    '.container')
                .height() - 100) {
                _this.start()
            }
        },
        _throttle: function(callback, delay) {
            var timer = null
            return function() {
                clearTimeout(timer)
                timer = setTimeout(function() {
                    if (timer) {
                        clearTimeout(timer)
                    }
                    callback()
                }, delay)
            }
        }

    }
    var search = {
        init: function() {
            this.$container = $('#search')
            this.keyword=''
            this.bind()
        },
        bind: function() {
            var _this = this
            this.$container.find('.button').on('click', function() {
                _this.keyword = _this.$container.find('input').val()
                _this.start()
            })
        },
        getData: function(callback) {
            console.log('getData')
            var _this = this
            if (this.loading) return
            this.loading = true
            this.$container.find('.loading').show()
            $.ajax({
                url: `https://api.douban.com/v2/movie/search`,
                type: 'GET',
                dataType:'jsonp',
                data:{q:this.keyword}
            }).done(function(res) {
                console.log(res, 'search')
                callback(res)
            }).fail(function() {
                console.log('失败')
            }).always(function() {
                _this.$container.find('.loading').hide()
            })
        },
        start: function() {
            console.log('start')
            var _this = this
            this.getData(function(data) {
                _this.render(data)
            })
        },
        render: function(data) {
            var _this = this
            console.log('render')
            data.subjects.forEach(function(move, index) {
                console.log(move)
                var directorsArr = function(move) {
                    let arr = []
                    move.directors.forEach(function(move, index) {
                        arr[index] = move.name
                    })

                    return arr.join(" 丶 ")
                }
                var castsArr = function(move) {
                    let arr = []
                    move.casts.forEach(function(move, index) {
                        arr[index] = move.name
                    })
                    return arr.join(" 丶 ")
                }
                var template =
                    `<div class="item">
                                    <a href="#">
                                        <div class="cover">
                                            <img src=${move.images.medium} alt="">
                                        </div>
                                        <div class="detail">
                                            <h2 class="title">${move.title}</h2>
                                            <div class="extra"><span class="score">${move.rating.average}分</span> / ${move.collect_count}收藏</div>
                                            <div class="extra">${move.year} / ${move.genres.join('/')}</div>
                                            <div class="extra">导演: ${directorsArr(move)}</div>
                                            <div class="extra">主演: ${castsArr(move)}</div>
                                        </div>
                                    </a>
                                </div>`
                _this.$container.find('.search-area').append(template)
            })
        },
        isToBottom: function() {
            console.log('isToBottom')
            var _this = this
            if (this.$container.height() + this.$container.scrollTop() >= this.$container.find(
                    '.container')
                .height() - 100) {
                _this.start()
            }
        },
        _throttle: function(callback, delay) {
            var timer = null
            return function() {
                clearTimeout(timer)
                timer = setTimeout(function() {
                    if (timer) {
                        clearTimeout(timer)
                    }
                    callback()
                }, delay)
            }
        }

    }
    app.init()