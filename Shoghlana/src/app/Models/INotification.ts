import { NotificationReason } from "../Enums/Notification-Reason"

export interface INotification
{
   id : Number,
   clientId : Number,
   freelancerId : Number,
   description : string,
   notificationTriggerId : Number,
   sentTime : string 
   reason : NotificationReason
   title : string,
   isRead : boolean 

}