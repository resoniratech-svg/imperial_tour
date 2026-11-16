import React, { useEffect, useState } from 'react';
import { Mail, Check, Trash2, Clock, CheckCircle2 } from 'lucide-react';
import { contentService } from '../../services/api';

export const AdminMessagesPage: React.FC = () => {
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const loadMessages = async () => {
    try {
      setLoading(true);
      const data = await contentService.getAllMessages();
      setMessages(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMessages();
  }, []);

  const handleMarkRead = async (id: string) => {
    try {
      await contentService.markMessageRead(id);
      loadMessages();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete message?')) return;
    try {
      await contentService.deleteMessage(id);
      loadMessages();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-2xl font-bold text-white">Inquiry Messages</h1>
        <p className="text-xs text-slate-400 mt-1">
          Messages submitted by prospective travelers through the Contact Us form.
        </p>
      </div>

      <div className="space-y-4">
        {messages.length > 0 ? (
          messages.map((m) => (
            <div
              key={m.id}
              className={`p-6 rounded-2xl border transition ${
                m.isRead
                  ? 'bg-slate-950/60 border-slate-800'
                  : 'bg-slate-950 border-gold-500/40 shadow-lg'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3 mb-3">
                <div className="flex items-center gap-3">
                  <div className={`w-2.5 h-2.5 rounded-full ${m.isRead ? 'bg-slate-600' : 'bg-gold-500'}`} />
                  <div>
                    <h3 className="font-bold text-white text-sm">{m.name}</h3>
                    <div className="text-[11px] text-slate-400 flex items-center gap-3">
                      <span>{m.email}</span>
                      {m.phone && <span>• {m.phone}</span>}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-xs text-slate-400">
                  <span className="font-mono text-[11px]">
                    {new Date(m.createdAt).toLocaleDateString()}
                  </span>
                  {!m.isRead && (
                    <button
                      onClick={() => handleMarkRead(m.id)}
                      className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-gold-400 text-[10px] font-semibold"
                    >
                      Mark Read
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(m.id)}
                    className="p-1 text-slate-500 hover:text-rose-400"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {m.subject && (
                <div className="text-xs font-semibold text-gold-400 mb-2">
                  Subject: {m.subject}
                </div>
              )}
              <p className="text-xs text-slate-300 leading-relaxed whitespace-pre-line">
                {m.message}
              </p>
            </div>
          ))
        ) : (
          <div className="text-center py-12 bg-slate-950 rounded-2xl border border-slate-800 text-slate-500 text-xs">
            No contact inquiries received yet.
          </div>
        )}
      </div>
    </div>
  );
};
