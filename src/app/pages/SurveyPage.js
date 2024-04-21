"use client";
import React from "react";
import "survey-core/defaultV2.min.css";
import { Model } from "survey-core";
import { Survey } from "survey-react-ui";
import { themeJson } from "../utils/survey_theme";

const surveyJson = {
  pages: [
    {
      name: "page1",
      title: "Lūdzu sniedziet atbildes par sevi!",
      elements: [
        {
          name: "participant_age",
          title: "Jūsu vecums",
          isRequired: true,
          type: "radiogroup",
          choices: [
            "18-21",
            "22-25",
            "26-30",
            "30-35",
            "35-40",
             
          ],
          showOtherItem: true,
          otherPlaceholder: {
            default: "",
          },
          otherText: {
            default: "Cits",
          },
        },

        {
          name: "hobbies",
          title: "Kādi ir Jūsu hobiji?",
          isRequired: true,
          type: "radiogroup",
          choices: [
            "māksla un rokdarbi",
            "mūzikas instrumentu spēlēšana",
            "orientēšanās un apvidus sporta veidi",
            "videospēles 2D",
            "videospēles 3D",
             
          ],
          showOtherItem: true,
          otherPlaceholder: {
            default: "",
          },
          otherText: {
            default: "Cits",
          },
        },
        {
          name: "response_time",
          title: "Emocijas atzīmēju:",
          isRequired: true,
          type: "radiogroup",
          choices: [
            "Pirms treniņa",
            "Pēc treniņa",
            "Cits"
            
          ],
          
        },
        {
          visibleIf:
            "{response_time} = 'Cits' ",
          name: "profession",
          title: "Kāda ir Jūsu nodarbošanās?",
          isRequired: true,
          type: "radiogroup",
          choices: [
            "pilna laika students",
            "nepilna laika students",
            "bezdarbnieks",
            "profesijas pārstāvis",
            
              ],
            ,
            showOtherItem: true,
            otherPlaceholder: {
              default: "",
            },
            otherText: {
              description: "Norādīt konkrētu profesijas nosaukumu",
              default: "profesijas pārstāvis",
            },
          },
           
        {
          visibleIf:
            "{response_time} = 'Pēc treniņa' ",
          name: "activity_intensity",
          title: "Kāda bija aktivitātes intensitāte?",
          type: "radiogroup",
          isRequired: true,
          choices: ["Augsta", "Vidēja", "Zema"],
        },
        {
          visibleIf:
            "{response_time} = 'Pēc treniņa' ",
          name: "activity_duration",
          title: "Cik ilgi veicāt aktivitāti?",
          description: "Laiku norādīt minūtēs",
          type: "text",
          inputType: "number",
          isRequired: true,
        },
        {
          visibleIf:
            "{response_time} = 'Pēc treniņa' ",
          name: "time_since_activity",
          title: "Cik ilgs laiks pagājis kopš aktivitātes veikšanas?",
          isRequired: true,
          type: "radiogroup",
          choices: ["Līdz 30 min", "30 min - 2h", "2 - 24h"],
          showOtherItem: true,
          otherPlaceholder: {
            default: "",
          },
          otherText: {
            default: "Cits laiks",
          },
        },
        {
          visibleIf:
            "{response_time} = 'Pēc treniņa'",
          type: "rating",
          name: "activity_result_rating",
          title: "Kā novērtētu aktivitātē sasniegto rezultātu?",
          isRequired: true,
          minRateDescription: "Neveiksmīgs",
          maxRateDescription: "Veiksmīgs",
          rateCount: 5,
          rateMax: 5,
          displayMode: "buttons",
          rateDescriptionLocation: "bottom",
        },
        {
          visibleIf:
            "{response_time} = 'Pēc treniņa'",
          name: "dance_duration",
          title: "Cik ilgi Jūs nodarbojatoies ar dejošanu?",
          description: "Laiku norādīt gados",
          type: "text",
          inputType: "number",
          isRequired: true,
        },
        {
          visibleIf:
            "{response_time} = 'Pēc treniņa' ",
          name: "dance_style",
          title: "Kāds ir Jūsu primārais deju stils?",
          isRequired: true,
          type: "radiogroup",
          choices: ["Laikmetīgā deja", "Show dance", "Klasiskā deja (balets)",  "Street dance",  "Tautiskās dejas",],
          showOtherItem: true,
          otherPlaceholder: {
            default: "",
          },
          otherText: {
            default: "Cits stils",
          },
        },
        {
          visibleIf:
            "{response_time} = 'Pēc treniņa' ",
          name: "second_dance_style",
          title: "Kāds ir Jūsu sekundārais (otrs labākais) deju stils??",
          isRequired: true,
          type: "radiogroup",
          choices: ["Laikmetīgā deja", "Show dance", "Klasiskā deja (balets)",  "Street dance",  "Tautiskās dejas",],
          showOtherItem: true,
          otherPlaceholder: {
            default: "",
          },
          otherText: {
            default: "Cits stils",
          },
        }
      ],
    },
  ],
  completeText: "Iesniegt",
  completedHtml: "Paldies par dalību!",
  showQuestionNumbers: "off",
  showPrevButton: false,
  firstPageIsStarted: true,
};

const customCss = {
  completedPage: "main",
};

export default function SurveyPage({ setPage, postData }) {
  const survey = new Model(surveyJson);
  survey.applyTheme(themeJson);
  survey.css = customCss;

  survey.onComplete.add((sender, options) => {
    options.showSaveInProgress("Saglabā...");
    postData(sender.data).then((result) => {
      if (result.success) {
        options.showSaveSuccess("Saglabāts!");
      } else {
        options.showSaveError("Neizdevās saglabāt!");
      }
    });
  });

  survey.onErrorCustomText.add(function (sender, options) {
    if (options.name == "required") {
      options.text = "Atbilde ir obligāta!";
    }
  });

  return <Survey model={survey} />;
}
