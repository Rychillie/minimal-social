import Leaf
import Vapor

// configures your application
public func configure(_ app: Application) async throws {
    // uncomment to serve files from /Public folder
    app.middleware.use(FileMiddleware(publicDirectory: app.directory.publicDirectory))

    // configure the Leaf to use the new folder
    app.leaf.configuration.rootDirectory = app.directory.workingDirectory + "Sources/App/Views"

    // register Leaf
    app.views.use(.leaf)

    // register routes
    try routes(app)
}