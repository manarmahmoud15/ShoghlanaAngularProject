import { Component, OnInit } from '@angular/core';
import { IFreelancer } from '../Models/ifreelancer';
import { ActivatedRoute } from '@angular/router';
import { workerData } from 'worker_threads';
import { Ijob } from '../Models/ijob';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-freelancer-work-history',
  standalone: true,
  imports: [CommonModule, DatePipe],
  templateUrl: './freelancer-work-history.component.html',
  styleUrl: './freelancer-work-history.component.css',
  providers : [DatePipe]
})
export class FreelancerWorkHistoryComponent implements OnInit {
  freelancer! : IFreelancer 
  WorkingHistory! : Ijob[]
constructor(private activatedRoute : ActivatedRoute, private datePipe : DatePipe) {
  
}
  ngOnInit(): void {
    const WorkingHistoryData = this.activatedRoute.snapshot.queryParamMap.get('workingHistory')
    if(WorkingHistoryData)
      {
       this.WorkingHistory = JSON.parse(WorkingHistoryData)
       console.log(this.WorkingHistory[0])
      //  this.WorkingHistory.forEach(job => {
      //   if(job.postTime)
      //     {
      //       job.postTime = this.datePipe.transform(job.postTime , 'medium')
      //     }
      //  });
      }
      this.FormatPostDate();

      this.WorkingHistory.forEach(job => {
        job.showFeedback = false
      });
  }

  FormatPostDate()
  {
    this.WorkingHistory.forEach(job => {
      if(job.postTime)
        {
          const formatedDate = this.datePipe.transform(job?.postTime, 'dd/mm/yyyy');
          if(formatedDate)
            {
              job.formattedPostTime = formatedDate
            }
        }
    });
  //  const job = this.WorkingHistory.find(j => j.id == JobId);
  //  return this.datePipe.transform(job?.postTime, 'mediumDate')
  }


  ToggleFeedback(jobId : Number)
  {
    const job = this.WorkingHistory.find(j => j.id == jobId)
    if(job)
      {
        job.showFeedback = !job.showFeedback
      }
  }
}
