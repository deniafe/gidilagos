'use client'

import { useEffect, useRef } from 'react';

import EmailEditor from 'react-email-editor';
import { Navbar } from './_components/Navbar';

export default function Page () {
  const emailEditorRef = useRef(null);

  // hooks/useInjectIframeCSS.js


// const useInjectIframeCSS = () => {
  useEffect(() => {
    // Function to inject CSS into iframe
   
  }, []);
// };

// export default useInjectIframeCSS;


  const exportHtml = () => {
    emailEditorRef?.current?.editor?.exportHtml((data) => {
      const { design, html } = data;
      console.log('exportHtml', html);
    });
  };

  const onLoad = () => {
    // editor instance is created
    // you can load your template here;
    const templateJson = {
      "counters": {
        "u_row": 3,
        "u_column": 5,
        "u_content_text": 5,
        "u_content_button": 2,
        "u_content_image": 1,
        "u_content_divider": 1
      },
      "body": {
        "rows": [
          {
            "id": "u_row_1",
            "cells": [1],
            "columns": [
              {
                "id": "u_column_1",
                "contents": [
                  {
                    "id": "u_content_image_1",
                    "type": "image",
                    "values": {
                      "containerPadding": "10px",
                      "src": {
                        "url": "https://via.placeholder.com/600x200",
                        "width": 600,
                        "height": 200
                      },
                      "textAlign": "center",
                      "altText": "Header Image",
                      "action": {
                        "name": "web",
                        "values": {
                          "href": "https://yourwebsite.com"
                        }
                      },
                      "border": {},
                      "padding": "10px"
                    }
                  }
                ]
              }
            ],
            "values": {
              "backgroundColor": "#ffffff",
              "padding": "0px",
              "columnsBackgroundColor": "#ffffff"
            }
          },
          {
            "id": "u_row_2",
            "cells": [1],
            "columns": [
              {
                "id": "u_column_2",
                "contents": [
                  {
                    "id": "u_content_text_1",
                    "type": "text",
                    "values": {
                      "containerPadding": "10px",
                      "text": "<h1 style=\"text-align: center; color: #333333;\">Welcome to Our Newsletter</h1>",
                      "textAlign": "center",
                      "fontFamily": {
                        "label": "Arial",
                        "value": "arial,helvetica,sans-serif"
                      },
                      "fontSize": "28px",
                      "lineHeight": "1.4",
                      "padding": "10px",
                      "border": {}
                    }
                  },
                  {
                    "id": "u_content_text_2",
                    "type": "text",
                    "values": {
                      "containerPadding": "10px",
                      "text": "<p style=\"text-align: center; color: #666666;\">Thank you for subscribing to our newsletter. We promise to bring you the latest updates and exclusive offers.</p>",
                      "textAlign": "center",
                      "fontFamily": {
                        "label": "Arial",
                        "value": "arial,helvetica,sans-serif"
                      },
                      "fontSize": "16px",
                      "lineHeight": "1.6",
                      "padding": "10px",
                      "border": {}
                    }
                  },
                  {
                    "id": "u_content_button_1",
                    "type": "button",
                    "values": {
                      "containerPadding": "10px",
                      "align": "center",
                      "buttonColors": {
                        "fill": "#1a73e8",
                        "text": "#ffffff"
                      },
                      "padding": "15px 30px",
                      "borderRadius": "5px",
                      "text": "<span style=\"font-family: arial,helvetica,sans-serif;\">Visit Our Website</span>",
                      "href": {
                        "name": "web",
                        "values": {
                          "href": "https://yourwebsite.com"
                        }
                      }
                    }
                  }
                ]
              }
            ],
            "values": {
              "backgroundColor": "#ffffff",
              "padding": "0px",
              "columnsBackgroundColor": "#ffffff"
            }
          },
          {
            "id": "u_row_3",
            "cells": [1],
            "columns": [
              {
                "id": "u_column_3",
                "contents": [
                  {
                    "id": "u_content_divider_1",
                    "type": "divider",
                    "values": {
                      "containerPadding": "10px",
                      "border": {
                        "borderTop": "1px solid #cccccc"
                      },
                      "width": "100%"
                    }
                  },
                  {
                    "id": "u_content_text_3",
                    "type": "text",
                    "values": {
                      "containerPadding": "10px",
                      "text": "<p style=\"text-align: center; color: #999999;\">You are receiving this email because you signed up for our newsletter.</p>",
                      "textAlign": "center",
                      "fontFamily": {
                        "label": "Arial",
                        "value": "arial,helvetica,sans-serif"
                      },
                      "fontSize": "14px",
                      "lineHeight": "1.6",
                      "padding": "10px",
                      "border": {}
                    }
                  },
                  {
                    "id": "u_content_text_4",
                    "type": "text",
                    "values": {
                      "containerPadding": "10px",
                      "text": "<p style=\"text-align: center; color: #999999;\">© 2024 Your Company Name. All rights reserved.</p>",
                      "textAlign": "center",
                      "fontFamily": {
                        "label": "Arial",
                        "value": "arial,helvetica,sans-serif"
                      },
                      "fontSize": "14px",
                      "lineHeight": "1.6",
                      "padding": "10px",
                      "border": {}
                    }
                  },
                  {
                    "id": "u_content_button_2",
                    "type": "button",
                    "values": {
                      "containerPadding": "10px",
                      "align": "center",
                      "buttonColors": {
                        "fill": "#1a73e8",
                        "text": "#ffffff"
                      },
                      "padding": "15px 30px",
                      "borderRadius": "5px",
                      "text": "<span style=\"font-family: arial,helvetica,sans-serif;\">Unsubscribe</span>",
                      "href": {
                        "name": "web",
                        "values": {
                          "href": "https://yourwebsite.com/unsubscribe"
                        }
                      }
                    }
                  }
                ]
              }
            ],
            "values": {
              "backgroundColor": "#ffffff",
              "padding": "0px",
              "columnsBackgroundColor": "#ffffff"
            }
          }
        ],
        "values": {
          "backgroundColor": "#f7f7f7",
          "contentWidth": "600px",
          "contentAlign": "center",
          "fontFamily": {
            "label": "Arial",
            "value": "arial,helvetica,sans-serif"
          },
          "fontSize": "14px",
          "lineHeight": "1.4"
        }
      }
    }
    ;
    emailEditorRef?.current?.editor?.loadDesign(templateJson);
  }

  const onReady = () => {
    // editor is ready
    console.log('onReady');

  };

  return (
    <div>
     
      
       <Navbar />
       <div className="mt-8">
       <div>
        <button onClick={exportHtml}>Export HTML</button>
      </div>
        <EmailEditor
            ref={emailEditorRef}
            onLoad={onLoad}
            onReady={onReady}
          />
       </div>
       
    </div>
  );
};