export const meta = () => {
  return [{ title: '关于' }];
};

export default function About() {
  return (
    <div className={'prose mx-auto mt-8'}>
      <h1 className={'text-center'}>关于 Resolid Remix</h1>
      <p>
        这是一个很有趣的 Remix 全栈演示站点，Remix 是一个全栈 Web 框架，可让您专注于用户界面并通过 Web
        标准进行工作，以提供快速、流畅且有弹性的用户体验。人们会喜欢使用你的东西。
      </p>
      <h2>技术栈</h2>
      <h3>React</h3>
      <p>
        React 可以改变你对所查看的设计和构建的应用的思考方式。当你使用 React
        构建用户界面时，首先会将其分解为称为组件的部分。接下来，你将描述每个组件的不同视觉状态。最后，你将连接这些组件，使数据通过它们流动。
      </p>
      <h3>Remix</h3>
      <p>
        Remix 是一个全栈网络框架，它允许你专注于用户界面，并通过 Web
        标准逆向工作，以提供快速、流畅且弹性的用户体验。使用你的工具的人们将会喜欢它。
      </p>
      <h3>Tailwind CSS</h3>
      <p>
        Tailwind CSS 的工作方式是通过扫描所有的 HTML 文件、JavaScript
        组件和其他模板中的类名，生成相应的样式，然后将它们写入一个静态的 CSS 文件。
      </p>
      <p>它速度快、灵活且可靠，且零运行时。</p>
      <h3>Vite</h3>
      <p>
        Vite 是一种具有明确建议的工具，具备合理的默认设置。您可以在 功能指南 中了解 Vite 的各种可能性。通过 插件，Vite
        支持与其他框架或工具的集成。如有需要，您可以通过 配置部分 自定义适应你的项目。
      </p>
      <p>Vite 还提供了强大的扩展性，可通过其 插件 API 和 JavaScript API 进行扩展，并提供完整的类型支持。</p>
      <h3>Hono</h3>
      <p>
        Hono - [炎] 在日语中表示火焰🔥，是一个面向 Edge 的小型、简单且超快速的 Web 框架。它适用于任何 JavaScript
        运行时环境：Cloudflare Workers、Fastly Compute、Deno、Bun、Vercel、Netlify、AWS Lambda、Lambda@Edge 和 Node.js。
      </p>
      <h3>Node.js</h3>
      <p>
        Node.js 是一个开源且跨平台的 JavaScript 运行环境。它是几乎任何类型项目的热门工具！ Node.js 运行的是 V8
        JavaScript 引擎，这是 Google Chrome 浏览器的核心，但在浏览器之外运行。这使得 Node.js 具有很高的性能。
      </p>
    </div>
  );
}
