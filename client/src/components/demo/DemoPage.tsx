import React from 'react';
import AccessibilityWidget from '@/components/accessibility/AccessibilityWidget';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const DemoPage: React.FC = () => {
  const embeddableScript = '<script src="https://your-domain.com/dist/hebrew-a11y.min.js" defer></script>';
  const advancedScript = '<script src="https://your-domain.com/dist/hebrew-a11y.min.js" data-position="bottom-left" defer></script>';

  // Function to copy appropriate script based on selected tab
  const copyScript = (advanced = false) => {
    const scriptToCopy = advanced ? advancedScript : embeddableScript;
    navigator.clipboard.writeText(scriptToCopy)
      .then(() => {
        alert('הקוד הועתק ללוח!');
      })
      .catch(err => {
        console.error('Failed to copy: ', err);
        alert('העתקה נכשלה, נסה להעתיק ידנית');
      });
  };

  return (
    <div dir="rtl" lang="he" className="min-h-screen bg-gray-50 font-heebo">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-5xl mx-auto px-4 py-5 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold bg-gradient-to-l from-blue-600 to-indigo-700 bg-clip-text text-transparent">כלי נגישות לאתרים בעברית</h1>
          <p className="mt-2 text-gray-600">כלי חינמי בהתאם לחוקי הנגישות הישראליים ותקן WCAG 2.0 AA</p>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="md:col-span-1">
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-gray-800">אודות הכלי</h2>
              <Card>
                <CardContent className="p-6">
                  <p className="mb-6 text-gray-700 leading-relaxed">
                    הכלי מספק פתרון נגישות מלא עבור אתרי אינטרנט בעברית, מאפשר למשתמשים להתאים את חווית הגלישה לצרכיהם, ומסייע לבעלי אתרים לעמוד בדרישות תקן ישראלי 5568 ו-WCAG 2.0 ברמת AA.
                  </p>
                  
                  <div className="bg-blue-50 border-r-4 border-blue-400 p-4 mb-6">
                    <p className="text-sm text-blue-700">
                      <strong>הכלי תומך בדרישות תקן ישראלי 5568</strong> המבוסס על WCAG 2.0 ברמת AA
                    </p>
                    <a href="/wcag-compliance.html" target="_blank" className="text-blue-700 font-bold text-sm mt-1 inline-block hover:underline">
                      לפרטים נוספים על התאימות לתקן &larr;
                    </a>
                  </div>
                  
                  <h3 className="text-lg font-bold mb-3 text-gray-800">תכונות עיקריות</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                    <div className="bg-white p-3 rounded-lg border border-gray-200 shadow-sm">
                      <h4 className="font-bold text-blue-700">התאמת גודל טקסט</h4>
                      <p className="text-sm text-gray-600">אפשרות להגדיל או להקטין את גודל הטקסט באתר</p>
                    </div>
                    <div className="bg-white p-3 rounded-lg border border-gray-200 shadow-sm">
                      <h4 className="font-bold text-blue-700">ניגודיות גבוהה</h4>
                      <p className="text-sm text-gray-600">שיפור הניגודיות בין טקסטים לרקע</p>
                    </div>
                    <div className="bg-white p-3 rounded-lg border border-gray-200 shadow-sm">
                      <h4 className="font-bold text-blue-700">מצב שחור-לבן</h4>
                      <p className="text-sm text-gray-600">מסייע לאנשים עם עיוורון צבעים</p>
                    </div>
                    <div className="bg-white p-3 rounded-lg border border-gray-200 shadow-sm">
                      <h4 className="font-bold text-blue-700">הדגשת קישורים</h4>
                      <p className="text-sm text-gray-600">להקלה על ניווט באתר</p>
                    </div>
                    <div className="bg-white p-3 rounded-lg border border-gray-200 shadow-sm">
                      <h4 className="font-bold text-blue-700">ניווט מקלדת</h4>
                      <p className="text-sm text-gray-600">תמיכה משופרת בניווט באמצעות מקלדת</p>
                    </div>
                    <div className="bg-white p-3 rounded-lg border border-gray-200 shadow-sm">
                      <h4 className="font-bold text-blue-700">הקראת טקסט</h4>
                      <p className="text-sm text-gray-600">תמיכה בהקראת תוכן בעברית</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>
          </div>

          <div className="md:col-span-1">
            <section className="sticky top-8">
              <h2 className="text-2xl font-bold mb-4 text-gray-800">הטמעה באתר שלך</h2>
              <Card>
                <CardContent className="p-6">
                  <div className="bg-amber-50 border-r-4 border-amber-400 p-4 mb-6">
                    <h3 className="font-bold text-amber-800 mb-2">כתב ויתור חשוב</h3>
                    <p className="text-sm text-amber-700">
                      הורדת והטמעת קוד הנגישות מהווה הסכמה לכתב הויתור המשפטי. בעל האתר נושא באחריות הבלעדית לעמידה בדרישות החוק.
                    </p>
                    <a href="/terms.html" target="_blank" className="text-amber-800 font-bold mt-2 inline-block hover:underline">קרא את כתב הויתור המלא ותנאי השימוש</a>
                  </div>
                  
                  <Tabs defaultValue="basic" className="mb-6">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="basic">קוד בסיסי</TabsTrigger>
                      <TabsTrigger value="advanced">קוד מתקדם</TabsTrigger>
                    </TabsList>
                    <TabsContent value="basic" className="mt-4">
                      <div className="bg-gray-100 p-4 rounded-md overflow-auto text-left ltr-text font-mono">
                        <pre className="text-sm break-all whitespace-pre-wrap">
                          {embeddableScript}
                        </pre>
                      </div>
                    </TabsContent>
                    <TabsContent value="advanced" className="mt-4">
                      <div className="bg-gray-100 p-4 rounded-md overflow-auto text-left ltr-text font-mono">
                        <pre className="text-sm break-all whitespace-pre-wrap">
                          {advancedScript}
                        </pre>
                      </div>
                      <p className="mt-2 text-xs text-gray-600">
                        תכונה data-position יכולה להיות: bottom-right (ברירת מחדל), bottom-left, top-right, או top-left
                      </p>
                    </TabsContent>
                  </Tabs>
                  
                  <div className="grid grid-cols-1 gap-3 mb-6">
                    <button 
                      onClick={() => {
                        // Copy the script to clipboard
                        navigator.clipboard.writeText(embeddableScript)
                          .then(() => {
                            // Show a simple alert or you could use a toast notification
                            alert('הקוד הועתק ללוח!');
                          })
                          .catch(err => {
                            console.error('Failed to copy: ', err);
                            alert('העתקה נכשלה, נסה להעתיק ידנית');
                          });
                      }} 
                      className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-md inline-flex items-center justify-center transition duration-300"
                    >
                      <span>העתק קוד להטמעה</span>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                        <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
                      </svg>
                    </button>
                    <a 
                      href="/terms.html" 
                      target="_blank"
                      className="bg-gray-100 hover:bg-gray-200 text-gray-800 text-center py-3 px-6 rounded-md transition duration-300"
                    >
                      קרא את התנאים וכתב הויתור
                    </a>
                  </div>
                  
                  <h3 className="text-lg font-bold mt-6 mb-3 text-gray-800">יתרונות</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-green-500 mt-0.5 ml-2 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-700">התאמה מלאה לדרישות החוק הישראלי</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-green-500 mt-0.5 ml-2 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-700">תמיכה מלאה בעברית ובדפדפנים מובילים</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-green-500 mt-0.5 ml-2 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-700">קוד קל וקטן שאינו פוגע בביצועי האתר</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-green-500 mt-0.5 ml-2 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-700">שומר העדפות משתמשים בין ביקורים</span>
                    </li>
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
