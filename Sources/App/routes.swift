import Vapor

func routes(_ app: Application) throws {
    app.get { req -> EventLoopFuture<View> in
        let context: [String: String] = [
            "isActive": "Home"
        ]

        return req.view.render("Pages/index", context)
    }

    app.get("notifications") { req -> EventLoopFuture<View> in
        let context: [String: String] = [
            "isActive": "Bell"
        ]

        return req.view.render("Pages/notifications", context)
    }

    app.get("messages") { req -> EventLoopFuture<View> in
        let context: [String: String] = [
            "isActive": "Send"
        ]

        return req.view.render("Pages/messages", context)
    }

    app.get("bookmarks") { req -> EventLoopFuture<View> in
        let context: [String: String] = [
            "isActive": "Bookmark"
        ]

        return req.view.render("Pages/bookmarks", context)
    }
}
