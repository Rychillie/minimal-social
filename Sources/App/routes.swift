import Vapor

func routes(_ app: Application) throws {
    app.get { req -> EventLoopFuture<View> in
        let context = PageContext(
            activePage: "Home",
            authenticated: false
        )

        return req.view.render("Pages/index", context)
    }

    app.get("notifications") { req -> EventLoopFuture<View> in
        let context: [String: String] = [
            "activePage": "Bell"
        ]

        return req.view.render("Pages/notifications", context)
    }

    app.get("messages") { req -> EventLoopFuture<View> in
        let context: [String: String] = [
            "activePage": "Send"
        ]

        return req.view.render("Pages/messages", context)
    }

    app.get("bookmarks") { req -> EventLoopFuture<View> in
        let context: [String: String] = [
            "activePage": "Bookmark"
        ]

        return req.view.render("Pages/bookmarks", context)
    }
}

struct PageContext: Encodable {
    let activePage: String
    let authenticated: Bool
}
