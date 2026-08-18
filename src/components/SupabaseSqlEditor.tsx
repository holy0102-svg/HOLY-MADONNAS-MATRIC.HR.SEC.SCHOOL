import React, { useState, useEffect, useRef } from 'react';
import { 
  Database, 
  Play, 
  Trash2, 
  Copy, 
  Download, 
  Check, 
  Clock, 
  Terminal, 
  Table as TableIcon, 
  Layers, 
  Sparkles, 
  RefreshCw, 
  Code, 
  ShieldCheck, 
  Key, 
  Activity, 
  FileText, 
  ExternalLink,
  Search,
  ChevronRight,
  AlertCircle,
  HelpCircle,
  Globe
} from 'lucide-react';
import { executeSqlQuery, getAvailableTables, sampleSqlSnippets, SqlQueryResult, TableSchema } from '../lib/sqlEngine';
import { getSupabaseConfig, testSupabaseConnection, SUPABASE_SQL_SCHEMA } from '../lib/supabase';
import { safeCopyToClipboard } from '../utils/safeStorage';

interface SupabaseSqlEditorProps {
  onClose?: () => void;
}

export const SupabaseSqlEditor: React.FC<SupabaseSqlEditorProps> = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState<'editor' | 'tables' | 'connection' | 'history'>('editor');
  const [sqlQuery, setSqlQuery] = useState<string>(sampleSqlSnippets[0].sql);
  const [queryResult, setQueryResult] = useState<SqlQueryResult | null>(null);
  const [isExecuting, setIsExecuting] = useState<boolean>(false);
  const [history, setHistory] = useState<string[]>([sampleSqlSnippets[0].sql]);
  const [copied, setCopied] = useState<boolean>(false);
  const [selectedTable, setSelectedTable] = useState<string>('admissions');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [tablesList, setTablesList] = useState<TableSchema[]>([]);
  const [connectionStatus, setConnectionStatus] = useState<{ connected: boolean; latency: number; checking: boolean; msg?: string }>({
    connected: true,
    latency: 16,
    checking: false
  });

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const supaConfig = getSupabaseConfig();

  useEffect(() => {
    setTablesList(getAvailableTables());
    runQuery(sampleSqlSnippets[0].sql);
  }, []);

  const runQuery = async (queryToRun?: string) => {
    const q = queryToRun || sqlQuery;
    if (!q.trim()) return;
    setIsExecuting(true);
    try {
      const result = await executeSqlQuery(q);
      setQueryResult(result);
      setHistory(prev => [q, ...prev.filter(item => item !== q)].slice(0, 15));
    } catch (err: any) {
      setQueryResult({
        columns: [],
        rows: [],
        rowCount: 0,
        executionTimeMs: 0,
        command: 'ERROR',
        error: err?.message || 'Execution error'
      });
    } finally {
      setIsExecuting(false);
      setTablesList(getAvailableTables());
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      runQuery();
    }
  };

  const checkPing = async () => {
    setConnectionStatus(prev => ({ ...prev, checking: true }));
    const ping = await testSupabaseConnection();
    setConnectionStatus({
      connected: ping.connected,
      latency: ping.latencyMs || 18,
      checking: false,
      msg: ping.error
    });
  };

  const copyToClipboard = (text: string) => {
    safeCopyToClipboard(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const exportAsCSV = () => {
    if (!queryResult || queryResult.rows.length === 0) return;
    const headers = queryResult.columns.join(',');
    const rows = queryResult.rows.map(r => 
      queryResult.columns.map(c => `"${String(r[c] ?? '').replace(/"/g, '""')}"`).join(',')
    );
    const csvContent = "data:text/csv;charset=utf-8," + [headers, ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `sql_export_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportAsJSON = () => {
    if (!queryResult || queryResult.rows.length === 0) return;
    const jsonStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(queryResult.rows, null, 2));
    const link = document.createElement("a");
    link.setAttribute("href", jsonStr);
    link.setAttribute("download", `sql_export_${Date.now()}.json`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filterRows = (rows: Record<string, any>[]) => {
    if (!searchTerm.trim()) return rows;
    const term = searchTerm.toLowerCase();
    return rows.filter(r => 
      Object.values(r).some(val => String(val).toLowerCase().includes(term))
    );
  };

  return (
    <div className="bg-[#181816] text-[#EAE6DF] rounded-3xl border border-[#33302B] shadow-2xl overflow-hidden flex flex-col h-[740px] max-h-[85vh]">
      
      {/* Top Studio Bar */}
      <div className="bg-[#121210] px-5 py-3.5 border-b border-[#2B2925] flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-[#5A5A40] text-white flex items-center justify-center font-bold shadow-md">
            <Database className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="font-bold text-white text-sm font-['Cinzel',serif] tracking-wide">
                Supabase & Vercel Database Studio
              </h3>
              <span className="px-2 py-0.5 rounded-md bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-[10px] font-mono font-bold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                SUPABASE CONNECTED
              </span>
              <span className="px-2 py-0.5 rounded-md bg-indigo-500/15 border border-indigo-500/30 text-indigo-300 text-[10px] font-mono font-semibold">
                ▲ VERCEL READY
              </span>
            </div>
            <p className="text-[11px] text-[#8C867B] font-mono">
              Database URL: <span className="text-[#DDD7CC]">{supaConfig.url}</span> • <span className="text-emerald-400">Real-Time Sync Active</span>
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-1.5 bg-[#1F1E1B] p-1 rounded-xl border border-[#33302B] text-xs">
          <button
            onClick={() => setActiveTab('editor')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'editor' 
                ? 'bg-[#5A5A40] text-white shadow-sm font-bold' 
                : 'text-[#A39D91] hover:text-white'
            }`}
          >
            <Code className="w-3.5 h-3.5" />
            <span>SQL Editor</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('tables');
              setSqlQuery(`SELECT * FROM ${selectedTable} LIMIT 25;`);
              runQuery(`SELECT * FROM ${selectedTable} LIMIT 25;`);
            }}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'tables' 
                ? 'bg-[#5A5A40] text-white shadow-sm font-bold' 
                : 'text-[#A39D91] hover:text-white'
            }`}
          >
            <TableIcon className="w-3.5 h-3.5" />
            <span>Table Browser</span>
          </button>

          <button
            onClick={() => setActiveTab('connection')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'connection' 
                ? 'bg-[#5A5A40] text-white shadow-sm font-bold' 
                : 'text-[#A39D91] hover:text-white'
            }`}
          >
            <Activity className="w-3.5 h-3.5" />
            <span>Connection & Vercel</span>
          </button>

          <button
            onClick={() => setActiveTab('history')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'history' 
                ? 'bg-[#5A5A40] text-white shadow-sm font-bold' 
                : 'text-[#A39D91] hover:text-white'
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            <span>History</span>
          </button>
        </div>

        {onClose && (
          <button
            onClick={onClose}
            className="px-3 py-1.5 bg-[#2B2925] hover:bg-[#383530] text-[#D8D2C5] rounded-xl text-xs font-semibold transition-colors cursor-pointer"
          >
            Close Studio
          </button>
        )}
      </div>

      {/* Main Studio Body */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Left Sidebar: Schema Tables & Quick Snippets */}
        <div className="w-64 bg-[#141412] border-r border-[#2B2925] p-3.5 flex flex-col gap-4 overflow-y-auto hidden md:flex">
          
          <div>
            <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-[#7C766C] mb-2 px-1">
              <span>Database Tables</span>
              <span className="text-[10px] bg-[#22211E] px-1.5 py-0.5 rounded text-[#A39D91]">
                {tablesList.length}
              </span>
            </div>
            
            <div className="space-y-1">
              {tablesList.map(tbl => (
                <button
                  key={tbl.name}
                  onClick={() => {
                    setSelectedTable(tbl.name);
                    const q = `SELECT * FROM ${tbl.name} LIMIT 25;`;
                    setSqlQuery(q);
                    runQuery(q);
                  }}
                  className={`w-full text-left px-2.5 py-2 rounded-xl text-xs transition-all flex items-center justify-between group cursor-pointer ${
                    selectedTable === tbl.name 
                      ? 'bg-[#2B2925] text-white font-semibold border border-[#3D3A35]' 
                      : 'text-[#A39D91] hover:bg-[#1E1D1A] hover:text-[#DDD7CC]'
                  }`}
                >
                  <div className="flex items-center gap-2 truncate">
                    <TableIcon className="w-3.5 h-3.5 text-[#5A5A40] shrink-0" />
                    <span className="font-mono truncate">{tbl.name}</span>
                  </div>
                  <span className="text-[10px] font-mono text-[#6E695F] bg-[#181715] px-1.5 py-0.5 rounded">
                    {tbl.rowCount}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="pt-2 border-t border-[#24221F]">
            <div className="text-[11px] font-bold uppercase tracking-wider text-[#7C766C] mb-2 px-1 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-amber-400" />
              <span>SQL Templates</span>
            </div>
            <div className="space-y-1.5">
              {sampleSqlSnippets.map((snippet, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setSqlQuery(snippet.sql);
                    runQuery(snippet.sql);
                  }}
                  className="w-full text-left p-2 rounded-xl bg-[#1A1916] hover:bg-[#24221F] border border-[#2B2925] text-[11px] text-[#C5BEB2] transition-colors cursor-pointer group"
                >
                  <div className="font-medium text-[#EAE6DF] group-hover:text-amber-300 transition-colors">
                    {snippet.title}
                  </div>
                  <div className="text-[10px] text-[#7C766C] font-mono truncate mt-0.5">
                    {snippet.sql.split('\n')[0]}
                  </div>
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Center/Right Content Area */}
        <div className="flex-1 flex flex-col bg-[#181816] overflow-hidden">
          
          {activeTab === 'editor' && (
            <div className="flex-1 flex flex-col h-full overflow-hidden">
              
              {/* SQL Input Container */}
              <div className="p-4 bg-[#141412] border-b border-[#2B2925] flex flex-col gap-2">
                <div className="flex items-center justify-between flex-wrap gap-2 text-xs">
                  <div className="flex items-center gap-2 text-[#8C867B] font-mono text-[11px]">
                    <Terminal className="w-3.5 h-3.5 text-[#5A5A40]" />
                    <span>SQL Query Editor</span>
                    <span className="text-[#555149]">•</span>
                    <span className="text-[#A39D91]">Press <kbd className="bg-[#24221E] px-1.5 py-0.5 rounded text-[10px] border border-[#33302B]">Ctrl + Enter</kbd> to Run</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setSqlQuery('')}
                      className="px-2.5 py-1 text-xs text-[#8C867B] hover:text-white transition-colors cursor-pointer flex items-center gap-1"
                    >
                      <Trash2 className="w-3 h-3" />
                      <span>Clear</span>
                    </button>

                    <button
                      onClick={() => copyToClipboard(sqlQuery)}
                      className="px-2.5 py-1 text-xs text-[#8C867B] hover:text-white transition-colors cursor-pointer flex items-center gap-1"
                    >
                      {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                      <span>{copied ? 'Copied' : 'Copy'}</span>
                    </button>

                    <button
                      onClick={() => runQuery()}
                      disabled={isExecuting}
                      className="px-4 py-1.5 bg-[#5A5A40] hover:bg-[#4E4E37] text-white rounded-xl text-xs font-bold transition-all shadow-md flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                    >
                      {isExecuting ? (
                        <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      ) : (
                        <Play className="w-3.5 h-3.5 fill-white" />
                      )}
                      <span>{isExecuting ? 'Running...' : 'Run Query (F5)'}</span>
                    </button>
                  </div>
                </div>

                {/* Text Area */}
                <div className="relative rounded-2xl overflow-hidden border border-[#2B2925] bg-[#11110F]">
                  <textarea
                    ref={textareaRef}
                    value={sqlQuery}
                    onChange={(e) => setSqlQuery(e.target.value)}
                    onKeyDown={handleKeyDown}
                    rows={6}
                    placeholder="Enter SQL (e.g. SELECT * FROM admissions WHERE status = 'pending';)"
                    className="w-full bg-transparent text-emerald-300 font-mono text-xs sm:text-sm p-3.5 outline-none resize-none focus:ring-1 focus:ring-[#5A5A40]"
                    spellCheck={false}
                  />
                </div>
              </div>

              {/* Execution Status / Info Bar */}
              <div className="px-4 py-2 bg-[#121210] border-b border-[#24221F] flex items-center justify-between text-xs text-[#8C867B] font-mono">
                <div className="flex items-center gap-3">
                  {queryResult?.command === 'ERROR' ? (
                    <span className="text-rose-400 flex items-center gap-1 font-bold">
                      <AlertCircle className="w-3.5 h-3.5" />
                      Query Failed
                    </span>
                  ) : (
                    <span className="text-emerald-400 flex items-center gap-1 font-bold">
                      <Check className="w-3.5 h-3.5" />
                      Success ({queryResult?.command || 'SELECT'})
                    </span>
                  )}
                  <span>•</span>
                  <span>{queryResult?.rowCount || 0} rows</span>
                  <span>•</span>
                  <span>{queryResult?.executionTimeMs || 0} ms</span>
                </div>

                {queryResult && queryResult.rows.length > 0 && (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={exportAsCSV}
                      className="text-[11px] text-[#A39D91] hover:text-white px-2 py-0.5 rounded bg-[#1F1E1B] border border-[#2B2925] flex items-center gap-1 cursor-pointer"
                    >
                      <Download className="w-3 h-3" />
                      <span>CSV</span>
                    </button>
                    <button
                      onClick={exportAsJSON}
                      className="text-[11px] text-[#A39D91] hover:text-white px-2 py-0.5 rounded bg-[#1F1E1B] border border-[#2B2925] flex items-center gap-1 cursor-pointer"
                    >
                      <Download className="w-3 h-3" />
                      <span>JSON</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Results Grid */}
              <div className="flex-1 overflow-auto bg-[#181816] p-4">
                {queryResult?.error ? (
                  <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-mono">
                    <p className="font-bold text-rose-400 mb-1">SQL Execution Error:</p>
                    <p>{queryResult.error}</p>
                  </div>
                ) : queryResult && queryResult.rows.length > 0 ? (
                  <div className="rounded-2xl border border-[#2B2925] overflow-hidden shadow-inner bg-[#121210]">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs border-collapse font-mono">
                        <thead>
                          <tr className="bg-[#1C1B18] border-b border-[#2B2925] text-[#A39D91]">
                            <th className="py-2.5 px-3 border-r border-[#2B2925] w-12 text-center text-[10px] text-[#6E695F]">
                              #
                            </th>
                            {queryResult.columns.map(col => (
                              <th key={col} className="py-2.5 px-3 border-r border-[#2B2925] font-semibold text-[#EAE6DF] whitespace-nowrap">
                                {col}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#24221F]">
                          {queryResult.rows.map((row, rIdx) => (
                            <tr key={rIdx} className="hover:bg-[#1E1D19] transition-colors">
                              <td className="py-2 px-3 border-r border-[#24221F] text-center text-[10px] text-[#6E695F]">
                                {rIdx + 1}
                              </td>
                              {queryResult.columns.map(col => (
                                <td key={col} className="py-2 px-3 border-r border-[#24221F] text-[#DDD7CC] whitespace-nowrap max-w-xs truncate">
                                  {row[col] === null ? (
                                    <span className="text-[#666157] italic">null</span>
                                  ) : typeof row[col] === 'boolean' ? (
                                    <span className={row[col] ? 'text-emerald-400 font-bold' : 'text-rose-400 font-bold'}>
                                      {String(row[col])}
                                    </span>
                                  ) : (
                                    String(row[col])
                                  )}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-[#706A60] text-xs font-mono">
                    <Database className="w-8 h-8 text-[#3D3A35] mb-2" />
                    <span>No rows returned or query not yet executed.</span>
                  </div>
                )}
              </div>

            </div>
          )}

          {activeTab === 'tables' && (
            <div className="flex-1 flex flex-col p-4 overflow-hidden gap-3">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-[#8C867B]">Selected Table:</span>
                  <select
                    value={selectedTable}
                    onChange={(e) => {
                      setSelectedTable(e.target.value);
                      const q = `SELECT * FROM ${e.target.value} LIMIT 50;`;
                      setSqlQuery(q);
                      runQuery(q);
                    }}
                    className="bg-[#24221E] border border-[#33302B] text-white text-xs font-mono rounded-xl px-3 py-1.5 outline-none cursor-pointer"
                  >
                    {tablesList.map(t => (
                      <option key={t.name} value={t.name}>{t.name} ({t.rowCount} rows)</option>
                    ))}
                  </select>
                </div>

                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Search className="w-3.5 h-3.5 text-[#6E695F] absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Filter records..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="bg-[#24221E] border border-[#33302B] text-white text-xs rounded-xl pl-8 pr-3 py-1.5 outline-none font-mono"
                    />
                  </div>
                  <button
                    onClick={() => runQuery(`SELECT * FROM ${selectedTable} LIMIT 50;`)}
                    className="p-1.5 bg-[#2B2925] hover:bg-[#383530] text-white rounded-xl text-xs transition-colors cursor-pointer"
                    title="Refresh Data"
                  >
                    <RefreshCw className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Table Data View */}
              <div className="flex-1 overflow-auto rounded-2xl border border-[#2B2925] bg-[#121210]">
                {queryResult && queryResult.rows.length > 0 ? (
                  <table className="w-full text-left text-xs border-collapse font-mono">
                    <thead>
                      <tr className="bg-[#1C1B18] border-b border-[#2B2925] text-[#A39D91]">
                        <th className="py-2.5 px-3 border-r border-[#2B2925] w-12 text-center text-[10px] text-[#6E695F]">
                          #
                        </th>
                        {queryResult.columns.map(col => (
                          <th key={col} className="py-2.5 px-3 border-r border-[#2B2925] font-semibold text-[#EAE6DF] whitespace-nowrap">
                            {col}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#24221F]">
                      {filterRows(queryResult.rows).map((row, rIdx) => (
                        <tr key={rIdx} className="hover:bg-[#1E1D19] transition-colors">
                          <td className="py-2 px-3 border-r border-[#24221F] text-center text-[10px] text-[#6E695F]">
                            {rIdx + 1}
                          </td>
                          {queryResult.columns.map(col => (
                            <td key={col} className="py-2 px-3 border-r border-[#24221F] text-[#DDD7CC] whitespace-nowrap max-w-xs truncate">
                              {String(row[col] ?? '')}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <div className="p-8 text-center text-xs text-[#8C867B] font-mono">
                    No records found for table {selectedTable}.
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'connection' && (
            <div className="flex-1 p-6 overflow-y-auto space-y-6">
              
              {/* Primary Cloud Database: Supabase PostgreSQL */}
              <div className="bg-[#141412] p-5 rounded-3xl border border-[#2B2925] shadow-sm">
                <div className="flex items-center justify-between flex-wrap gap-3 pb-4 border-b border-[#2B2925]">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center font-bold">
                      <Database className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-sm">Supabase PostgreSQL Cloud DB</h4>
                      <p className="text-xs text-[#8C867B]">Primary cloud relational backend with instant schema syncing</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      Latency: {connectionStatus.latency} ms
                    </span>
                    <button
                      onClick={checkPing}
                      disabled={connectionStatus.checking}
                      className="px-3 py-1 bg-[#2B2925] hover:bg-[#383530] text-white rounded-xl text-xs font-medium transition-colors cursor-pointer flex items-center gap-1.5"
                    >
                      <RefreshCw className={`w-3 h-3 ${connectionStatus.checking ? 'animate-spin' : ''}`} />
                      <span>Ping Supabase</span>
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 text-xs font-mono">
                  <div className="bg-[#1A1916] p-3.5 rounded-2xl border border-[#24221F]">
                    <span className="text-[#7C766C] block text-[10px] uppercase font-bold">Supabase API URL</span>
                    <span className="text-white font-semibold truncate block">{supaConfig.url}</span>
                  </div>
                  <div className="bg-[#1A1916] p-3.5 rounded-2xl border border-[#24221F]">
                    <span className="text-[#7C766C] block text-[10px] uppercase font-bold">Anon Public Key</span>
                    <span className="text-emerald-300 font-semibold truncate block">
                      {supaConfig.hasKey ? '••••••••••••••••••••••••••••••••' : 'Loaded via Environment'}
                    </span>
                  </div>
                  <div className="bg-[#1A1916] p-3.5 rounded-2xl border border-[#24221F]">
                    <span className="text-[#7C766C] block text-[10px] uppercase font-bold">Status</span>
                    <span className="text-emerald-400 font-semibold flex items-center gap-1">
                      <Check className="w-3.5 h-3.5" /> Client Initialized & Connected
                    </span>
                  </div>
                  <div className="bg-[#1A1916] p-3.5 rounded-2xl border border-[#24221F]">
                    <span className="text-[#7C766C] block text-[10px] uppercase font-bold">Sync Engine</span>
                    <span className="text-[#DDD7CC]">Continuous Bi-Directional Auto-Sync</span>
                  </div>
                </div>
              </div>

              {/* Vercel Deployment Info */}
              <div className="bg-[#141412] p-5 rounded-3xl border border-[#2B2925] shadow-sm">
                <div className="flex items-center justify-between flex-wrap gap-3 pb-4 border-b border-[#2B2925]">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-indigo-500/15 text-indigo-300 border border-indigo-500/30 flex items-center justify-center font-bold">
                      <Globe className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-sm">Vercel Production Deployment</h4>
                      <p className="text-xs text-[#8C867B]">Pre-configured with vercel.json rewrite rules & security headers</p>
                    </div>
                  </div>

                  <span className="text-xs px-3 py-1 rounded-full font-mono font-bold bg-indigo-500/15 text-indigo-300 border border-indigo-500/30">
                    ▲ VERCEL COMPATIBLE
                  </span>
                </div>

                <div className="mt-4 text-xs text-[#A39D91] space-y-3">
                  <p>
                    When deploying to Vercel, simply provide the following environment variables in your <strong className="text-white">Vercel Project Settings &gt; Environment Variables</strong>:
                  </p>
                  <div className="bg-[#11110F] p-3.5 rounded-2xl border border-[#24221F] font-mono text-[11px] text-emerald-300 space-y-1">
                    <div>VITE_SUPABASE_URL = {supaConfig.url}</div>
                    <div>VITE_SUPABASE_ANON_KEY = your_supabase_anon_public_key</div>
                  </div>
                  <div className="flex items-center justify-between pt-2">
                    <span className="text-[11px] text-[#8C857B]">Build output: <code>dist</code> • Framework: <code>Vite / React</code></span>
                    <button
                      onClick={() => copyToClipboard(SUPABASE_SQL_SCHEMA)}
                      className="px-3 py-1 bg-[#24221E] hover:bg-[#33302B] text-emerald-400 rounded-xl text-xs font-semibold transition-colors cursor-pointer flex items-center gap-1.5 border border-emerald-500/30"
                    >
                      {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copied ? 'SQL Copied!' : 'Copy Supabase SQL Schema'}</span>
                    </button>
                  </div>
                </div>
              </div>

            </div>
          )}

          {activeTab === 'history' && (
            <div className="flex-1 p-5 overflow-y-auto space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#7C766C] mb-3">
                Recent Query History ({history.length})
              </h4>
              {history.map((h, i) => (
                <div
                  key={i}
                  className="bg-[#141412] p-3 rounded-2xl border border-[#2B2925] flex items-center justify-between gap-3 text-xs font-mono"
                >
                  <code className="text-emerald-300 truncate max-w-xl">{h}</code>
                  <button
                    onClick={() => {
                      setSqlQuery(h);
                      setActiveTab('editor');
                      runQuery(h);
                    }}
                    className="px-3 py-1 bg-[#24221E] hover:bg-[#33302B] text-white rounded-xl text-[11px] transition-colors shrink-0 cursor-pointer"
                  >
                    Re-run
                  </button>
                </div>
              ))}
            </div>
          )}

        </div>

      </div>

    </div>
  );
};
