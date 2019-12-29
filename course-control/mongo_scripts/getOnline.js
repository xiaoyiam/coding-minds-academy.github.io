// mongo ds247569.mlab.com:47569/shareworks-prod -u [username] -p [password] < registration_page.js > ../course2020Spring1.js
var upcomingCourses = db.Course.find({"term":'Spring 2020'}).sort({'courseCode':1});
var upCoursesArray = upcomingCourses.toArray();
// printjson(upCoursesArray);
var irvineDB = {};
var arcadiaDB = {};
var onlineDB = {};
var orgs = {'5d801257d2c9f600154965d8':'a',
'5b2423bbc0991500145353f4':'i',
"5dfa8d08d9391000141d6015":'o'};
var coursesDB = db.CoursesDB.find({}).sort({'courseCode':1});
var coursesDBArray = coursesDB.toArray();
// printjson(coursesDBArray.length);
// var onlineList = [];
// coursesDBArray.forEach(course=>{
//     onlineList.push(course.courseCode);
// })
// printjson(onlineList);
upCoursesArray.forEach(course=>{
          var range;
          var dayTime;
        //   print(11);
        //   printjson(course.dateStart);
          var strStart = course.dateStart.toJSON();
          var strEnd = course.dateEnd.toJSON();
          var strStart = strStart.slice(5,10).replace('-','/');
          var strEnd = strEnd.slice(5,10).replace('-','/');
          range = strStart + '-' +strEnd;
          dayTime = course.classDay + ' ' +course.classTime + '-' + course.classEndTime;
          var location = orgs[course.organizationId.str];
          var courseid = course._id.str;
          var repeatInfo = {'courseid':courseid, 'dayTime':dayTime, 'range':range, 'orgnization':location};
        //   print(course.courseCode);
          if(location == 'o'){
            // printjson(course);
            if (!(course.courseCode in onlineDB)){
                onlineDB[course.courseCode] = [];
                onlineDB[course.courseCode].push(repeatInfo);
              }
              else{
                onlineDB[course.courseCode].push(repeatInfo);
              }    
          }
          else if (location === 'a'){
              
            if (!(course.courseCode in arcadiaDB)){
              arcadiaDB[course.courseCode] = [];
              arcadiaDB[course.courseCode].push(repeatInfo);
            }
            else{
              arcadiaDB[course.courseCode].push(repeatInfo);
            }          
          }else if(location === 'i'){
            if (!(course.courseCode in irvineDB)){
              irvineDB[course.courseCode] = [];
              irvineDB[course.courseCode].push(repeatInfo);
            }
            else{
              irvineDB[course.courseCode].push(repeatInfo);
            }   
          }

        });
        // printjson(coursesDBArray);
        // printjson(irvineDB);
        // printjson(arcadiaDB);
        
var courseListArcadia = [];
var courseListIrvine = [];
var courseListOnline = [];
// var temparray = [...coursesDBArray];
// coursesDBArray.forEach(course=>{
//     // course['id'] = course['_id'].str;
//     var tempcourse = course;
//     // delete course['_id'];
    
//     // printjson(tempcourse.courseCode);
//     if(tempcourse.courseCode in irvineDB){
//       tempcourse['repeatData'] = irvineDB[tempcourse.courseCode]
//         courseListIrvine.push(tempcourse);
//       }
//   });
  // coursesDBArray.forEach(course1=>{
  //   // delete course1['_id'];

  //   var tempcourse1 = course1;

  //   if(tempcourse1.courseCode in arcadiaDB){
  //     tempcourse1['repeatData'] = arcadiaDB[tempcourse1.courseCode] 
  //     courseListArcadia.push(tempcourse1);  
  //     // if(tempcourse1.courseCode == 'cs410'){
  //     //   print("arcadia----------")
  //     //   printjson(tempcourse1);
  //     // }
  //   }
  // });
  coursesDBArray.forEach(course=>{

    if(course.courseCode in onlineDB){
        course['repeatData'] = onlineDB[course.courseCode] 
        courseListOnline.push(course);  
    }
});
        // print('var irvinedb = ');
        // printjson(courseListIrvine);
        // print('var arcadiadb = ');
        // printjson(courseListArcadia);
        print('var onlinedb = ');
        printjson(courseListOnline);


