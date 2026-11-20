# 网站共享包使用说明 | Shared Package Guide | Anleitung für das gemeinsame Paket

---

# 中文

## 导出共享包
1. 使用 Chrome 或 Edge 打开网站主页。
2. 点击右上角的下载图标“⇩”。视频页和 PPT 页右上角也有“Paket exportieren”按钮。
3. 浏览器会下载 `kosmos-shared-package.zip`。压缩包内包含 `shared-content.json` 和 `media` 文件夹。

## 让访客看到最新内容
1. 解压 `kosmos-shared-package.zip`。
2. 将解压出的 `shared-content.json` 和 `media` 文件夹复制到网站文件所在目录。系统询问是否合并或覆盖时，选择覆盖。
3. 将整个网站目录重新发布到网站托管平台。主页、视频页、PPT 页以及 `shared-package.js`、`shared-home.js` 都必须一起发布。
4. 访客打开更新后的网站，就能看到共享内容。

每次添加或修改内容后，都要重新导出、解压并覆盖文件，再重新发布。访客不会自动收到你电脑上的更新。

## 说明
- 请通过网站地址或本地 Web 服务器打开页面。直接双击 HTML 文件（`file://` 模式）可能无法读取共享清单。
- ZIP 只包含当前浏览器保存的插件、视频和幻灯片。其他人的电脑数据不会自动上传。
- 插件中的外部网页只会分享链接；本地图片、视频等媒体文件会一起打包。

---

# English

## Export the shared package
1. Open the website’s homepage in Chrome or Edge.
2. Click the download icon “⇩” in the upper-right corner. The Videos and Presentation pages also have a “Paket exportieren” button in the upper-right corner.
3. Your browser downloads `kosmos-shared-package.zip`. The archive contains `shared-content.json` and a `media` folder.

## Publish the latest content for visitors
1. Extract `kosmos-shared-package.zip`.
2. Copy the extracted `shared-content.json` and `media` folder into the directory containing the website files. If asked whether to merge or overwrite, choose to overwrite.
3. Publish the entire website directory to your hosting provider again. Publish the homepage, Videos page, Presentation page, `shared-package.js`, and `shared-home.js` together.
4. Visitors will see the shared content when they open the updated website.

Whenever you add or change content, export the package again, extract it, overwrite the files, and republish the site. Visitors do not receive updates from your computer automatically.

## Notes
- Open the pages through the website URL or a local web server. Opening an HTML file by double-clicking it (`file://` mode) may prevent the shared manifest from loading.
- The ZIP contains only the plugins, videos, and slides saved in the current browser. Data on other people’s computers is not uploaded automatically.
- External webpages in plugins are shared as links only. Local media files, such as images and videos, are included in the package.

---

# Deutsch

## Gemeinsames Paket exportieren
1. Öffne die Startseite der Website in Chrome oder Edge.
2. Klicke oben rechts auf das Download-Symbol „⇩“. Auch auf den Seiten „Videos“ und „Präsentation“ gibt es oben rechts die Schaltfläche „Paket exportieren“.
3. Der Browser lädt `kosmos-shared-package.zip` herunter. Das Archiv enthält `shared-content.json` und einen Ordner `media`.

## Aktuelle Inhalte für Besucher veröffentlichen
1. Entpacke `kosmos-shared-package.zip`.
2. Kopiere die entpackte Datei `shared-content.json` und den Ordner `media` in denselben Ordner wie die Website-Dateien. Wenn du gefragt wirst, ob Dateien zusammengeführt oder überschrieben werden sollen, wähle „Überschreiben“.
3. Veröffentliche den gesamten Website-Ordner erneut bei deinem Hosting-Anbieter. Die Startseite, die Video- und Präsentationsseite sowie `shared-package.js` und `shared-home.js` müssen gemeinsam veröffentlicht werden.
4. Besucher sehen die freigegebenen Inhalte, sobald sie die aktualisierte Website öffnen.

Wenn du Inhalte hinzufügst oder änderst, exportiere das Paket erneut, entpacke es, überschreibe die Dateien und veröffentliche die Website erneut. Besucher erhalten Änderungen auf deinem Computer nicht automatisch.

## Hinweise
- Öffne die Seiten über die Website-Adresse oder einen lokalen Webserver. Beim direkten Öffnen einer HTML-Datei per Doppelklick (`file://`) kann die gemeinsame Manifestdatei möglicherweise nicht geladen werden.
- Die ZIP-Datei enthält nur Plugins, Videos und Folien, die im aktuell verwendeten Browser gespeichert sind. Daten von anderen Computern werden nicht automatisch hochgeladen.
- Externe Webseiten in Plugins werden nur als Links geteilt. Lokale Mediendateien wie Bilder und Videos sind im Paket enthalten.
