function greet(name){
    alert(("Hello "+name));
}
greet("Prajwal");

let interestsNews = [
    {sports:"Cricket,Football,Volleyball"},
    {politics:"BJP,Congress,JDS"},
    {entertainment:"Movies,TV Shows,Cartoons"}
]

let outputResult = interestsNews.filter(output => output.sports !== undefined);
console.log(outputResult);