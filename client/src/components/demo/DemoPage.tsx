import React from 'react';
import AccessibilityWidget from '@/components/accessibility/AccessibilityWidget';
import { createEmbeddableScript } from '@/lib/HebrewAccessibilityWidget';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const DemoPage: React.FC = () => {
  const embeddableScript = createEmbeddableScript();

  return (
    <div dir="rtl" lang="he" className="min-h-screen bg-gray-50 font-heebo">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-5xl mx-auto px-4 py-5 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">כלי נגישות לאתרים בעברית</h1>
          <p className="mt-2 text-gray-600">כלי חינמי בהתאם לחוקי הנגישות הישראליים ותקן WCAG 2.1</p>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">דוגמה לאתר עם כלי הנגישות</h2>
              <Card>
                <CardContent className="p-0">
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2">מידע על החברה</h3>
                    <p className="mb-4">ברוכים הבאים לאתר החברה שלנו. אנו מספקים שירותים איכותיים ללקוחות שלנו כבר למעלה מעשר שנים. המטרה שלנו היא להבטיח שכל לקוח מקבל את השירות הטוב ביותר.</p>
                    <p>צוות המומחים שלנו עומד לרשותכם בכל שאלה או בקשה. אנחנו מאמינים בשירות אישי, מקצועי ואדיב.</p>
                  </div>
                  <div className="border-t p-6">
                    <h3 className="text-xl font-bold mb-2">השירותים שלנו</h3>
                    <ul className="list-disc list-inside mb-4 space-y-1">
                      <li>ייעוץ מקצועי בתחום העסקי</li>
                      <li>פיתוח אפליקציות מותאמות אישית</li>
                      <li>שירותי אבטחת מידע</li>
                      <li>אסטרטגיית שיווק דיגיטלי</li>
                    </ul>
                    <a href="#" className="text-blue-600 hover:underline">קראו עוד על השירותים שלנו</a>
                  </div>
                  <div className="border-t p-6">
                    <h3 className="text-xl font-bold mb-2">צור קשר</h3>
                    <form>
                      <div className="mb-4">
                        <label htmlFor="name" className="block mb-2 font-medium">שם מלא</label>
                        <input type="text" id="name" className="w-full p-2 border border-gray-300 rounded" required />
                      </div>
                      <div className="mb-4">
                        <label htmlFor="email" className="block mb-2 font-medium">דואר אלקטרוני</label>
                        <input type="email" id="email" className="w-full p-2 border border-gray-300 rounded" required />
                      </div>
                      <div className="mb-4">
                        <label htmlFor="message" className="block mb-2 font-medium">הודעה</label>
                        <textarea id="message" rows={4} className="w-full p-2 border border-gray-300 rounded" required></textarea>
                      </div>
                      <button type="button" className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">שלח הודעה</button>
                    </form>
                  </div>
                </CardContent>
              </Card>
            </section>
          </div>

          <div className="md:col-span-1">
            <section className="sticky top-8">
              <h2 className="text-2xl font-bold mb-4">הטמעה באתר שלך</h2>
              <Card>
                <CardContent className="p-6">
                  <p className="mb-4">העתיקו את הקוד הבא ושלבו אותו בדף ה-HTML שלכם, בתוך תגית ה-&lt;body&gt;:</p>
                  
                  <Tabs defaultValue="script" className="mb-4">
                    <TabsList className="grid w-full grid-cols-1">
                      <TabsTrigger value="script">קוד להטמעה</TabsTrigger>
                    </TabsList>
                    <TabsContent value="script" className="mt-4">
                      <div className="bg-gray-100 p-3 rounded-md overflow-auto max-h-80 text-left ltr-text">
                        <pre className="text-xs">
                          <code>{embeddableScript}</code>
                        </pre>
                      </div>
                    </TabsContent>
                  </Tabs>

                  <h3 className="text-lg font-bold mb-2">תכונות נגישות</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>התאמת גודל טקסט</li>
                    <li>ניגודיות גבוהה</li>
                    <li>מצב שחור-לבן</li>
                    <li>הדגשת קישורים</li>
                    <li>ניווט מקלדת</li>
                    <li>סמן מוגדל</li>
                    <li>עצירת אנימציות</li>
                    <li>הקראת טקסט בעברית</li>
                  </ul>
                  
                  <h3 className="text-lg font-bold mt-4 mb-2">יתרונות</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>קל להטמעה ושימוש</li>
                    <li>עומד בדרישות החוק הישראלי</li>
                    <li>תמיכה מלאה בעברית וב-RTL</li>
                    <li>קוד קל ולא פוגע בביצועי האתר</li>
                    <li>שומר העדפות משתמשים</li>
                  </ul>
                </CardContent>
              </Card>
            </section>
          </div>
        </div>
      </main>

      <footer className="bg-gray-800 text-white py-8">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center">כלי נגישות לאתרים בעברית - חינם לשימוש חופשי</p>
        </div>
      </footer>

      {/* Accessibility Widget */}
      <AccessibilityWidget position="bottom-right" />
    </div>
  );
};

export default DemoPage;
