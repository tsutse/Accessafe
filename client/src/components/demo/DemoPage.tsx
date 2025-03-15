import React from 'react';
import AccessibilityWidget from '@/components/accessibility/AccessibilityWidget';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const DemoPage: React.FC = () => {
  const embeddableScript = '<script src="https://your-domain.com/dist/hebrew-a11y.min.js" defer></script>';
  const advancedScript = '<script src="https://your-domain.com/dist/hebrew-a11y.min.js" data-position="bottom-left" defer></script>';

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
                  <div className="bg-amber-50 border-r-4 border-amber-400 p-4 mb-4">
                    <h3 className="font-bold text-amber-800 mb-2">כתב ויתור חשוב</h3>
                    <p className="text-sm text-amber-700">
                      הורדת והטמעת קוד הנגישות מהווה הסכמה לכתב הויתור המשפטי. בעל האתר נושא באחריות הבלעדית לעמידה בדרישות החוק.
                    </p>
                    <a href="/terms.html" className="text-amber-800 font-bold mt-2 inline-block hover:underline">קרא את כתב הויתור המלא ותנאי השימוש</a>
                  </div>
                  
                  <div className="bg-blue-50 border-r-4 border-blue-400 p-4 mb-4">
                    <p className="text-sm text-blue-700">
                      <strong>כלי זה תומך בדרישות תקן ישראלי 5568</strong> המבוסס על WCAG 2.0 ברמת AA
                    </p>
                    <a href="/wcag-compliance.html" className="text-blue-700 font-bold text-sm mt-1 inline-block hover:underline">
                      לפרטים נוספים על התאימות לתקן &larr;
                    </a>
                  </div>
                  
                  <p className="mb-4">לאחר אישור תנאי השימוש, תוכלו להטמיע את הקוד באתר שלכם:</p>
                  
                  <a href="/terms.html" className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-md inline-flex items-center transition duration-300 mb-4">
                    <span>אשר את התנאים וקבל את קוד ההטמעה</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </a>
                  
                  <div className="mt-2 text-sm">
                    <a href="/implementation-example" className="text-blue-600 hover:underline">
                      צפייה בדוגמת הטמעה מפורטת &larr;
                    </a>
                  </div>

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
