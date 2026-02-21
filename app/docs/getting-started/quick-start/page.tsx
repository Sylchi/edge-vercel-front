import { Nav } from '@/components/nav'
import { Footer } from '@/components/footer'
import { DocsSidebar } from '@/components/docs/docs-sidebar'
import { CodeBlock } from '@/components/docs/code-block'
import { Callout } from '@/components/docs/callout'
import { Separator } from '@/components/ui/separator'

export default function QuickStartPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Nav />
      
      <div className="flex flex-1">
        <DocsSidebar />
        
        <main className="flex-1 bg-background">
          <article className="max-w-4xl mx-auto px-8 py-12">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-4xl font-bold mb-4">Quick Start</h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {'Get up and running with Edgerun in 5 minutes. This guide will walk you through installing the SDK, compiling a WASM module, and running your first compute job.'}
              </p>
            </div>
            
            <Separator className="my-8" />
            
            {/* Content */}
            <div className="prose prose-invert max-w-none space-y-8">
              {/* Prerequisites */}
              <section>
                <h2 className="text-2xl font-bold mb-4">Prerequisites</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  {'Before you begin, make sure you have the following installed:'}
                </p>
                <ul className="space-y-2 text-muted-foreground list-disc list-inside">
                  <li>Node.js 18 or later</li>
                  <li>A Solana wallet with some SOL for transaction fees</li>
                  <li>Basic knowledge of WebAssembly (optional but helpful)</li>
                </ul>
              </section>
              
              {/* Installation */}
              <section>
                <h2 className="text-2xl font-bold mb-4">Installation</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  {'Install the Edgerun SDK using npm or yarn:'}
                </p>
                <CodeBlock
                  code="npm install @edgerun/sdk"
                  language="bash"
                />
                <p className="text-muted-foreground leading-relaxed mt-4">
                  {'Or with yarn:'}
                </p>
                <CodeBlock
                  code="yarn add @edgerun/sdk"
                  language="bash"
                />
              </section>
              
              {/* Initialize */}
              <section>
                <h2 className="text-2xl font-bold mb-4">Initialize Your Project</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  {'Create a new file called index.js and initialize the Edgerun client:'}
                </p>
                <CodeBlock
                  code={`import { EdgerunClient } from '@edgerun/sdk';

const client = new EdgerunClient({
  wallet: 'your-wallet-private-key',
  network: 'mainnet-beta'
});

console.log('Edgerun client initialized!');`}
                  language="javascript"
                />
                <Callout type="warning">
                  {'Never commit your wallet private key to version control. Use environment variables instead.'}
                </Callout>
              </section>
              
              {/* Compile WASM */}
              <section>
                <h2 className="text-2xl font-bold mb-4">Compile a WASM Module</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  {'For this example, we\'ll use a simple Rust program. First, create a new Rust project:'}
                </p>
                <CodeBlock
                  code={`cargo new --lib hello-wasm
cd hello-wasm`}
                  language="bash"
                />
                <p className="text-muted-foreground leading-relaxed mt-4 mb-4">
                  {'Edit src/lib.rs:'}
                </p>
                <CodeBlock
                  code={`#[no_mangle]
pub extern "C" fn add(a: i32, b: i32) -> i32 {
    a + b
}`}
                  language="rust"
                />
                <p className="text-muted-foreground leading-relaxed mt-4 mb-4">
                  {'Compile to WASM:'}
                </p>
                <CodeBlock
                  code="cargo build --target wasm32-unknown-unknown --release"
                  language="bash"
                />
              </section>
              
              {/* Submit Job */}
              <section>
                <h2 className="text-2xl font-bold mb-4">Submit Your First Job</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  {'Now submit the compiled WASM module to Edgerun:'}
                </p>
                <CodeBlock
                  code={`import fs from 'fs';

const wasmBuffer = fs.readFileSync('./target/wasm32-unknown-unknown/release/hello_wasm.wasm');

const job = await client.submitJob({
  name: 'My First Job',
  wasm: wasmBuffer,
  workerCount: 5
});

console.log('Job submitted:', job.id);`}
                  language="javascript"
                />
              </section>
              
              {/* Monitor */}
              <section>
                <h2 className="text-2xl font-bold mb-4">Monitor Job Status</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  {'Check the status of your job:'}
                </p>
                <CodeBlock
                  code={`const status = await client.getJobStatus(job.id);

console.log('Status:', status.status);
console.log('Progress:', status.progress);

if (status.status === 'completed') {
  console.log('Results:', status.results);
}`}
                  language="javascript"
                />
                <Callout type="success">
                  {'Congratulations! You\'ve successfully run your first compute job on Edgerun.'}
                </Callout>
              </section>
              
              {/* Next Steps */}
              <section>
                <h2 className="text-2xl font-bold mb-4">Next Steps</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  {'Now that you\'ve run your first job, here are some next steps:'}
                </p>
                <ul className="space-y-2 text-muted-foreground list-disc list-inside">
                  <li>Learn about Core Concepts like consensus and settlement</li>
                  <li>Explore the full API Reference</li>
                  <li>Join our Discord community for support</li>
                  <li>Check out example projects on GitHub</li>
                </ul>
              </section>
            </div>
          </article>
        </main>
      </div>
      
      <Footer />
    </div>
  )
}
