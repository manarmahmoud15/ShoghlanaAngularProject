import { Injectable } from '@angular/core';
import { IFreelancer } from '../Models/ifreelancer';

@Injectable({
  providedIn: 'root'
})
export class StaticFreelancersService {

  FreelancersArr: IFreelancer[]
  constructor() {
    this.FreelancersArr = [
      {
        id: 1,
        name: " محمد علاء",
        title: "مهندس برمجيات",
        description: "مطور ويب محترف بخبرة تتجاوز 5 سنوات في تصميم وتطوير مواقع الإنترنت. يمتلك مهارات في HTML، CSS، JavaScript، وReact. يسعى دائمًا لتحويل الأفكار إلى مواقع ويب فعّالة وجذابة.",
        skills: ["HTML", "CSS", "Angular"],
        rate: 3,
        imgURL: "https://randomuser.me/api/portraits/men/47.jpg" , 
        portfolio : ["project1" , "project2" , "project3"] ,
        workHistory : ["work1" , "work2" , "work3"]
      },
      {
        id: 2,
        name: "أحمد عماد",
        title: "مطور الواجهة الأمامية",
        description: "مطور واجهة أمامية بخبرة 4 سنوات، ماهر في HTML، CSS، وJavaScript. يتقن استخدام React وAngular لتطوير واجهات مستخدم جذابة وسلسة. متميز في تحسين الأداء وضمان التوافق مع مختلف الأجهزة والمتصفحات.",
        skills: ["Angular", "React", "Sass"],
        rate: 2,
        imgURL: "https://randomuser.me/api/portraits/men/32.jpg" ,
        portfolio : ["project1" , "project2" , "project3"] ,
        workHistory : ["work1" , "work2" , "work3"]
      },
      {
        id: 3,
        name: "علي محمود",
        title: "مطور تطبيقات موبايل",
        description: "مبرمج تطبيقات موبايل محترف، متخصص في تطوير تطبيقات Android وiOS. يستخدم أحدث التقنيات والأدوات البرمجية لضمان تطبيقات فعالة وسهلة الاستخدام. لديه سجل حافل في تسليم المشاريع في الوقت المحدد وبأعلى جودة.",
        skills: ["Flutter", "Java"],
        rate: 5,
        imgURL: "https://randomuser.me/api/portraits/men/79.jpg",
        portfolio : ["project1" , "project2" , "project3"] ,
        workHistory : ["work1" , "work2" , "work3"]
      },
      {
        id: 4,
        name: "وائل خالد",
        title: "مطور الواجهة الخلفية",
        description: "مطور واجهة خلفية بخبرة 4 سنوات، متمرس في لغات البرمجة مثل Python وJava وNode.js، مع إجادة في إطارات العمل مثل Django وSpring.",
        skills: [".NET", "MVC", "Design patterns"],
        rate: 4,
        imgURL: "https://randomuser.me/api/portraits/men/67.jpg" ,
        portfolio : ["project1" , "project2" , "project3"] ,
        workHistory : ["work1" , "work2" , "work3"],
      },
      {
        id: 5,
        name: "ندى عماد",
        title: "مطور سي ار ام",
        description: "مطور CRM بخبرة 4 سنوات، متخصص في تصميم وتطوير أنظمة إدارة علاقات العملاء (CRM). يتقن استخدام Salesforce وMicrosoft Dynamics لتخصيص حلول تلبي احتياجات الأعمال. متميز في تحسين عمليات الأعمال وضمان تجربة مستخدم سلسة.",
        skills: ["MS-dynamics", "Salesforce"],
        rate: 3,
        imgURL: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTaaoC8Al1kvJ8lCX6cLPd-XG4L9lamYwunkKmBmi8Lfw&s",
        portfolio : ["project1" , "project2" , "project3"] ,
        workHistory : ["work1" , "work2" , "work3"],
      },
      {
        id: 6,
        name: "مينا سامح",
        title: "مصمم جرافيك",
        description: "مصمم جرافيك مبدع بخبرة واسعة في تصميم الشعارات، الكتيبات، والمواد الترويجية. يستخدم برامج Adobe Illustrator وPhotoshop لإنتاج تصاميم مبتكرة وجذابة تلبي احتياجات العملاء وتفوق توقعاتهم.",
        skills: ["Photoshop", "Allustrator", "Aftereffect"],
        rate: 4,
        imgURL: "https://randomuser.me/api/portraits/men/9.jpg",
        portfolio : ["project1" , "project2" , "project3"] ,
        workHistory : ["work1" , "work2" , "work3"],
      },
    ];
  }

  getAll() {

    return this.FreelancersArr;
  }

  getById(id: number): IFreelancer | undefined {

    return this.FreelancersArr.find(f => f.id == id)
  }

}