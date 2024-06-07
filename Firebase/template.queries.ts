import {
    addDoc,
    collection,
    doc,
    deleteDoc,
    updateDoc,
    getDoc,
    DocumentReference,
    query,
    getDocs,
    orderBy,
    startAfter,
    limit,
    QueryDocumentSnapshot
  } from 'firebase/firestore';
  import { EmailTemplate } from '@/lib/types';
  import { handleError } from '@/lib/utils';
  import { db } from './config';
  
  export async function getEmailTemplates(pageSize: number, lastVisible: QueryDocumentSnapshot | null = null) {
  
    const templatesCollection = collection(db, 'emailTemplates');
  
    try {
      let templatesQuery;
      if (lastVisible) {
        templatesQuery = query(
          templatesCollection,
          orderBy('createdAt'),
          startAfter(lastVisible),
          limit(pageSize)
        );
      } else {
        templatesQuery = query(
          templatesCollection,
          orderBy('createdAt'),
          limit(pageSize)
        );
      }
  
      const templatesSnapshot = await getDocs(templatesQuery);
  
      const templates: EmailTemplate[] = templatesSnapshot.docs.map(doc => {
        const data = doc.data()
        const template: EmailTemplate = {
          id: doc.id,
          name: data.name,
          createdAt: data.createdAt.toDate(),
          updatedAt: data.updatedAt.toDate(),
          content: data.content,
          previewImage: data.previewImage
        }
        return template
      });
  
      console.log('There are email templates', templates)
  
      const newLastVisible = templatesSnapshot.docs.length > 0 ? templatesSnapshot.docs[templatesSnapshot.docs.length - 1] : null;
  
      return { templates, lastVisible: newLastVisible, error: null }
  
    } catch (e) {
      return { templates: [] as EmailTemplate[], lastVisible: null, error: e }
    }
  }
  
  export async function getEmailTemplateById(templateId: string) {
  
    try {
      const templateDocRef = doc(db, 'emailTemplates', templateId);
      const templateDocSnap = await getDoc(templateDocRef);
  
      if (templateDocSnap.exists()) {
        const data = templateDocSnap.data();
        const template: EmailTemplate = {
          id: templateDocSnap.id,
          name: data.name,
          createdAt: data.createdAt.toDate(),
          updatedAt: data.updatedAt.toDate(),
          content: data.content,
          previewImage: data.previewImage
        };
  
        console.log('Email template found:', template);
        return { template, error: null };
      } else {
        console.log('No such document!');
        return { template: null, error: 'No such document' };
      }
    } catch (e) {
      console.error('Error getting document:', e);
      return { template: null, error: e };
    }
  }
  
  export async function createEmailTemplate(template: Partial<EmailTemplate>) {
  
    let result: void | null | DocumentReference = null;
  
    try {
      const updatedAt = new Date();
      const createdAt = new Date();
      const templateData = { ...template, updatedAt, createdAt };
      result = await addDoc(collection(db, 'emailTemplates'), templateData);
      return { result, error: null };
    } catch (e) {
      handleError(e)
      return { result: null, error: e };
    }
  }
  
  export async function deleteEmailTemplate(templateId: string) {
  
    const templateDocRef = doc(db, 'emailTemplates', templateId);
  
    try {
      await deleteDoc(templateDocRef);
      return { success: true };
    } catch (e) {
      handleError(e)
      return { success: false, error: e };
    }
  }
  
  export async function updateEmailTemplate(templateId: string, templateData: Partial<EmailTemplate>) {
  
    const templateDocRef = doc(db, 'emailTemplates', templateId);
  
    try {
      const templateSnapshot = await getDoc(templateDocRef);
      if (!templateSnapshot.exists()) {
        return { error: "Email template not found." };
      }
  
      const updatedAt = new Date();
      const newData = { ...templateData, updatedAt };
  
      await updateDoc(templateDocRef, newData);
      return { success: true };
    } catch (e) {
      handleError(e)
      return { success: false, error: e };
    }
  }
  
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
    // emailEditorRef?.current?.editor?.loadDesign(templateJson);
  }