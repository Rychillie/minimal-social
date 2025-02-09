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

    app.post("auth", "magic-link") { req -> EventLoopFuture<HTTPStatus> in
        struct MagicLinkRequest: Content {
            let email: String
        }
        
        let request = try req.content.decode(MagicLinkRequest.self)

        print("EMAIL: \(request.email)")
        
        // 1. Gerar token
        // 2. Salvar no banco
        // 3. Enviar email
        // 4. Retornar resposta
        
        return req.eventLoop.makeSucceededFuture(.ok)
    }
}

struct PageContext: Encodable {
    let activePage: String
    let authenticated: Bool
}
