import LeafKit
import Vapor
import Leaf

// configures your application
public func configure(_ app: Application) async throws {
    // uncomment to serve files from /Public folder
    app.middleware.use(FileMiddleware(publicDirectory: app.directory.publicDirectory))

    let pathToViews = URL(fileURLWithPath: #filePath)
        .deletingLastPathComponent()
        .appendingPathComponent("Views")
        .relativePath
    
    app.leaf.sources = LeafSources.singleSource(
        NIOLeafFiles(
            fileio: app.fileio,
            limits: .default,
            sandboxDirectory: pathToViews,
            viewDirectory: pathToViews
        )
    )

    app.views.use(.leaf)

    // register routes
    try routes(app)
}
