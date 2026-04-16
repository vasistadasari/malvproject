/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Shield, 
  Terminal, 
  Bug, 
  Lock, 
  ExternalLink, 
  ShieldAlert, 
  ShieldCheck, 
  Info,
  Cpu,
  FileCode,
  AlertTriangle,
  ChevronRight
} from 'lucide-react';

interface MalwareInfo {
  id: string;
  name: string;
  type: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  anatomy: string[];
  mockPayload: string;
  defense: string[];
}

const MALWARE_DATA: MalwareInfo[] = [
  {
    id: 'rat',
    name: 'Remote Access Trojan (RAT)',
    type: 'Spyware / Remote Exposure',
    description: 'A Remote Access Trojan (RAT) is a malware program that includes a back door for administrative control over the target computer. They are usually downloaded invisibly as a payload of a seemingly innocent-looking program.',
    icon: <ExternalLink className="w-6 h-6" />,
    color: 'emerald',
    anatomy: [
      'Drops a hidden server component on target system',
      'Establishes a reverse connection to a C&C (Command & Control) server',
      'Modifies registry for persistence after reboot',
      'Implements keylogging and screen capturing modules'
    ],
    mockPayload: `// --- THEORETICAL RAT PERSISTENCE LOGIC (NON-FUNCTIONAL) ---
// Note: This logic illustrates how a RAT attempts to stay hidden

function setupPersistence() {
  const registryPath = "HKCU\\\\Software\\\\Microsoft\\\\Windows\\\\CurrentVersion\\\\Run";
  const mockSystemPath = "C:\\\\Users\\\\Public\\\\Documents\\\\system_update.exe";
  
  // Logic to copy self to a stealthy location
  // writeFileSync(mockSystemPath, readFileSync(process.argv[1]));
  
  // Logic to add to startup registry
  // setRegistryValue(registryPath, "SystemUpdate", mockSystemPath);
  
  console.log("[RESEARCH] Simulating persistence mechanism...");
}

function establishConnection() {
  const ccServer = "192.168.x.x:4444";
  console.log(\`[RESEARCH] Initializing encrypted heartbeat to \${ccServer}...\`);
  // socket.connect(ccServer);
}`,
    defense: [
      'Use a robust Firewall to block unauthorized outgoing connections',
      'Implement Least Privilege access control',
      'Monitor network traffic for unusual outbound heartbeats',
      'Regularly audit scheduled tasks and registry startup keys'
    ]
  },
  {
    id: 'ransomware',
    name: 'Ransomware',
    type: 'Extortion / Encryption',
    description: 'Ransomware is a type of malicious software from cryptovirology that threatens to publish the victim\'s personal data or perpetually block access to it unless a ransom is paid.',
    icon: <Lock className="w-6 h-6" />,
    color: 'rose',
    anatomy: [
      'Scans local and network drives for specific file extensions (.docx, .jpg, .db)',
      'Generates a unique encryption key (e.g., AES-256)',
      'Encrypts files in-place and appends a new extension',
      'Displays a ransom note demanding payment via cryptocurrency'
    ],
    mockPayload: `// --- THEORETICAL RANSOMWARE LOGIC (NON-FUNCTIONAL) ---
// Note: This illustrates the targeted file discovery process

async function analyzeTargetFiles() {
  const targets = ['*.pdf', '*.docx', '*.xlsx', '*.jpg', '*.sql'];
  const baseDir = "C:\\\\Users\\\\Target\\\\Documents";
  
  console.log("[RESEARCH] Identifying files for theoretical encryption...");
  
  // Pseudo-code for file iteration
  // const files = await getFileList(baseDir, targets);
  // files.forEach(file => {
  //   const key = generateSecureKey(256);
  //   // encryptFile(file, key);
  //   console.log(\`[SIMULATION] Processing: \${file}\`);
  // });
  
  console.log("[RESEARCH] Encryption simulation complete. Ransom note logic initialized.");
}`,
    defense: [
      'Maintain frequent, offline backups of critical data',
      'Use EDR (Endpoint Detection and Response) to spot mass file system changes',
      'Disable macros in Microsoft Office by default',
      'Enable "Controlled Folder Access" in operating system settings'
    ]
  },
  {
    id: 'virus',
    name: 'Self-Replicating Virus',
    type: 'Propagation / Corruptive',
    description: 'A computer virus is a type of malicious software that, when executed, replicates itself by modifying other computer programs and inserting its own code.',
    icon: <Bug className="w-6 h-6" />,
    color: 'amber',
    anatomy: [
      'Searches for executable files (.exe, .com, .scr) on the system',
      'Injects its own code into the padding or start of the host file',
      'Hijacks the execution flow to run virus code before host code',
      'Often carries a "payload" (e.g., deleting files, displaying messages)'
    ],
    mockPayload: `// --- THEORETICAL VIRUS REPLICATION LOGIC (NON-FUNCTIONAL) ---
// Note: This shows the "Search and Infect" methodology

function replicate(targetBinary) {
  const virusSign = "0xBADCODE";
  
  // Check if file is already infected
  // if (hasSignature(targetBinary, virusSign)) return;
  
  // Inject virus body into host entry point
  // const hostCode = readBytes(targetBinary);
  // const infectedCode = VIRUS_BODY + hostCode;
  
  // writeBytes(targetBinary, infectedCode);
  console.log(\`[RESEARCH] Simulating infection of \${targetBinary}\`);
}

function findHosts() {
  console.log("[RESEARCH] Scanning /bin for potential host binaries...");
  // findExecutables().forEach(replicate);
}`,
    defense: [
      'Use real-time heuristic antivirus scanning',
      'Avoid downloading files from unverified third-party sources',
      'Keep your Operating System and software updated with security patches',
      'Use file integrity monitoring for critical system binaries'
    ]
  }
];

export default function App() {
  const [selectedMalware, setSelectedMalware] = useState<MalwareInfo | null>(MALWARE_DATA[0]);
  const [activeTab, setActiveTab] = useState<'info' | 'anatomy' | 'payload' | 'defense'>('info');

  const getAccentColor = (id: string) => {
    switch (id) {
      case 'rat': return 'var(--color-rat)';
      case 'ransomware': return 'var(--color-ransom)';
      case 'virus': return 'var(--color-virus)';
      default: return 'var(--color-rat)';
    }
  };

  const getAccentClass = (id: string) => {
    switch (id) {
      case 'rat': return 'rat';
      case 'ransomware': return 'ransom';
      case 'virus': return 'virus';
      default: return 'rat';
    }
  };

  return (
    <div className="min-h-screen bg-bento-bg text-bento-text font-sans p-6 flex flex-col gap-6 selection:bg-rat/30">
      <header className="flex justify-between items-end border-b border-bento-border pb-3">
        <div className="flex flex-col">
          <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            <Shield className="w-6 h-6 text-rat" />
            Malware Analysis & Simulation Lab
          </h1>
        </div>
        <div className="font-mono text-[12px] text-bento-dim">
          PROJECT_ID: EDU_CS_2024 // STATUS: LOCAL_EMULATION_MODE // {new Date().toISOString().split('T')[0]}
        </div>
      </header>

      <main className="grid grid-cols-[280px_1fr_240px] gap-4 grow">
        {/* Module Selection Panel */}
        <section className="bento-card row-span-2 gap-3 overflow-y-auto">
          <div className="card-label"><span /> Malware Class Library</div>
          <div className="flex flex-col gap-3">
            {MALWARE_DATA.map((item) => (
              <motion.button
                key={item.id}
                onClick={() => {
                   setSelectedMalware(item);
                   setActiveTab('info');
                }}
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.98 }}
                style={{
                  borderColor: selectedMalware?.id === item.id ? getAccentColor(item.id) : undefined,
                  backgroundColor: selectedMalware?.id === item.id ? `color-mix(in srgb, ${getAccentColor(item.id)} 5%, transparent)` : '#1a1a1a'
                }}
                className={`text-left p-4 rounded-xl border transition-all flex flex-col gap-1 ${
                  selectedMalware?.id === item.id 
                    ? 'border-rat' 
                    : 'border-[#333] hover:border-[#444]'
                }`}
              >
                <h3 className="font-semibold text-[16px] transition-colors" 
                    style={{ color: selectedMalware?.id === item.id ? getAccentColor(item.id) : '#fff' }}>
                  {item.id.toUpperCase()}. {item.name.replace('Self-Replicating ', '')}
                </h3>
                <p className="text-[12px] text-bento-dim line-clamp-2 leading-relaxed">
                  {item.description}
                </p>
              </motion.button>
            ))}
          </div>

          <div className="mt-auto p-3 bg-[#1a1a1a] rounded-lg border border-bento-border">
             <div className="card-label mb-2"><span /> Execution Warning</div>
             <p className="text-[11px] text-[#888] italic leading-tight">
               Payloads are isolated to the sandbox environment for research purposes only.
             </p>
          </div>
        </section>

        {/* Main Display / Payload Viewer */}
        <section className="bento-card col-span-1 row-span-2 relative bg-[#0c0c0c] p-0 overflow-hidden">
          {/* Custom Terminal Header */}
          <div className="flex items-center gap-2 px-5 py-3 border-b border-white/5 bg-black/40">
            <div className="flex gap-2">
              <div className="terminal-dot" />
              <div className="terminal-dot" />
              <div className="terminal-dot" />
            </div>
            <span className="text-[10px] text-[#444] font-mono ml-3 uppercase tracking-widest">
              {selectedMalware?.id || 'null'}_module_v2.1
            </span>

            {/* In-content Tabs */}
            <div className="ml-auto flex gap-1">
              {(['info', 'anatomy', 'payload', 'defense'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-3 py-1 text-[10px] font-bold uppercase tracking-tighter rounded border transition-all ${
                    activeTab === tab 
                    ? 'bg-rat/10 text-rat border-rat/30' 
                    : 'text-bento-dim hover:text-bento-text border-transparent'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Dynamic Content Detail */}
          <div className="p-8 grow overflow-y-auto relative">
            <AnimatePresence mode="wait">
              {selectedMalware ? (
                <motion.div
                  key={selectedMalware.id + activeTab}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                  className="h-full"
                >
                  {activeTab === 'info' && (
                    <div className="space-y-6">
                      <div className="flex items-center gap-4">
                        <div className="p-4 rounded-xl bg-white/5 border border-bento-border" style={{ color: getAccentColor(selectedMalware.id) }}>
                          {selectedMalware.icon}
                        </div>
                        <div>
                          <h2 className="text-2xl font-bold text-white">{selectedMalware.name}</h2>
                          <span className="text-[10px] font-mono text-bento-dim uppercase tracking-widest">{selectedMalware.type}</span>
                        </div>
                      </div>
                      <p className="text-lg text-bento-text/80 leading-relaxed font-light italic border-l-2 border-rat/20 pl-6">
                        "{selectedMalware.description}"
                      </p>
                    </div>
                  )}

                  {activeTab === 'anatomy' && (
                    <div className="space-y-6 font-mono text-sm h-full flex flex-col">
                       <div className="card-label"><span /> Infection Lifecycle Details</div>
                       <div className="grid gap-3">
                          {selectedMalware.anatomy.map((step, i) => (
                            <div key={i} className="flex gap-4 items-start p-3 bg-white/5 rounded-lg border border-white/5 hover:border-rat/20 transition-colors">
                              <span className="text-rat font-bold mt-0.5 opacity-50">0{i+1}_</span>
                              <p className="text-bento-text/90 shrink leading-relaxed">{step}</p>
                            </div>
                          ))}
                       </div>
                    </div>
                  )}

                  {activeTab === 'payload' && (
                    <div className="h-full flex flex-col gap-4">
                       <div className="card-label"><span /> Theoretical Source Analysis</div>
                       <pre className="grow bg-black/60 p-6 rounded-xl border border-white/5 font-mono text-[13px] leading-relaxed text-[#9cdcfe] overflow-auto shadow-inner">
                         {selectedMalware.mockPayload.split('\n').map((line, i) => (
                           <div key={i} className="flex gap-4">
                             <span className="w-8 text-[#333] select-none text-right">{i+1}</span>
                             <span>{line}</span>
                           </div>
                         ))}
                       </pre>
                    </div>
                  )}

                  {activeTab === 'defense' && (
                    <div className="space-y-6">
                       <div className="card-label"><span /> Defense Mitigation Vector</div>
                       <div className="grid grid-cols-2 gap-4 text-sm font-mono">
                         {selectedMalware.defense.map((def, i) => (
                           <div key={i} className="p-4 bg-white/5 border border-white/5 rounded-xl flex items-start gap-3 hover:translate-y-[-2px] transition-all">
                              <ShieldCheck className="w-5 h-5 text-rat/40 mt-1 shrink-0" />
                              <p className="text-bento-text/80 leading-snug">{def}</p>
                           </div>
                         ))}
                       </div>
                    </div>
                  )}
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>

          {/* Bottom Action Bar */}
          <div className="p-5 flex justify-end gap-3 bg-black/40 border-t border-white/5">
             <button
               style={{ backgroundColor: selectedMalware ? getAccentColor(selectedMalware.id) : 'var(--color-rat)' }}
               className="text-black font-bold text-[12px] px-6 py-2 rounded-lg cursor-pointer transform transition-all active:scale-95 shadow-lg shadow-rat/10"
             >
               GENERATE PAYLOAD
             </button>
             <button className="text-white bg-transparent border border-[#444] font-semibold text-[12px] px-6 py-2 rounded-lg hover:bg-white/5 transition-colors">
               COPY SRC
             </button>
          </div>
        </section>

        {/* Right Sidebar Metrics */}
        <section className="flex flex-col gap-4">
           {/* Stat Card 1 */}
           <div className="bento-card flex-1">
              <div className="card-label"><span /> System Integrity</div>
              <div className="text-[32px] font-bold text-rat mt-auto">NORMAL</div>
              <div className="text-[11px] text-bento-dim mt-2">Sandbox escape detection active. Memory protection: <span className="text-white">ON</span>.</div>
           </div>

           {/* Stat Card 2 */}
           <div className="bento-card flex-1">
              <div className="card-label"><span /> Threat Level</div>
              <div className="text-[32px] font-bold text-[#444] mt-auto">LOW</div>
              <div className="text-[11px] text-bento-dim mt-2">Payload not currently active in local ring-0 kernel memory.</div>
           </div>

           {/* Event Log Card */}
           <div className="bento-card flex-[1.5] overflow-hidden">
              <div className="card-label"><span /> Event Log</div>
              <div className="font-mono text-[11px] leading-[1.8] text-[#666] mt-2 h-0 grow overflow-y-auto pr-2 custom-scrollbar">
                [14:02:11] Init Payload Builder...<br />
                [14:02:12] Module {selectedMalware?.id.toUpperCase()} loaded.<br />
                [14:02:15] Dependency Check: OK<br />
                [14:02:18] Encryption: XOR v1<br />
                [14:03:01] Awaiting build command...<br />
                <div className="flex items-center gap-2 text-rat mt-2">
                  <span className="w-2 h-2 rounded-full bg-rat shadow-[0_0_10px_rgba(0,255,156,0.6)] animate-pulse" />
                  Listening on 127.0.0.1:4444
                </div>
              </div>
           </div>
        </section>
      </main>
    </div>
  );
}
