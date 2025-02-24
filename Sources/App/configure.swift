import Leaf
import Vapor

// configures your application
public func configure(_ app: Application) async throws {
    // uncomment to serve files from /Public folder
    app.middleware.use(FileMiddleware(publicDirectory: app.directory.publicDirectory))

    // Configuração do Leaf (caminho absoluto)
    let viewsPath = app.directory.workingDirectory + "Sources/App/Views"
    app.leaf.configuration.rootDirectory = viewsPath

    // Debug: Imprima o caminho para verificar
    print("🟢 Leaf rootDirectory:", viewsPath)
    
    // register Leaf
    app.views.use(.leaf)
    
    // register routes
    try routes(app)
}
