const { Post } = require("../models");

const samplePostData = [
  {
    title: "Thousands of civilians trapped in key Ukraine city",
    post_content:
      "Food and water are running out for the women and children still there, a UN official tells the BBC.",
    user_id: 2,
  },

  {
    title: "Russian Foreign Minister Sergei Lavrov fact-checked",
    post_content:
      "Ukraine is not a member of Nato and, although it has expressed a wish to join, there is no timeframe for this. \\n Mr Lavrov said Russia invaded Ukraine to stop the West `dragging`Ukraine into the military alliance. \\n  If Ukraine were to become a member of Nato, the alliance would be obliged to defend it from attacks by Russia or other adversari \\n  Nato hasn't deployed any combat troops to Ukraine, but co-operation has deepened since 2014. \\n Nato members have supported Ukraine with equipment and training following the annexation of Crimea by Russia and foreign military trainers have had a presence in the country. \\n In March, Ukraine's President Volodymyr Zelensky said: `It is clear that Ukraine is not a member of Nato; we understand this.` ",
    user_id: 1,
  },
  {
    title: "Millions could get payouts in iPhone battery row",
    post_content:
      "The tech giant is accused of secretly slowing down the performance of older models.",
    user_id: 4,
  },

  {
    title: "How human-like are the most sophisticated chatbots?",
    post_content:
      " As a Google engineer says his firm's top chatbot has feelings, just how lifelike is the technology?",
    user_id: 1,
  },

  {
    title: "Heineken says Father's Day beer contest is a scam",
    post_content:
      "A message circulating on WhatsApp offering the chance to win beer is a phishing scam, Heineken says.",
    user_id: 7,
  },

  {
    title: "£18m cyber-security hub centre opens in Dundee",
    post_content:
      "Abertay University's cyberQuarter centre is the first of its kind in Scotland.",
    user_id: 4,
  },

  {
    title: "UK-first wind and solar mobile mast switched on",
    post_content:
      "Mobile masts generating their own electricity could be placed in remote off-grid locations.",
    user_id: 3,
  },

  {
    title: "Planned 5G mast branded 'monstrosity' by residents",
    post_content:
      "Mobile provider Three says the 52ft-high mast in Southampton will be `as unobtrusive as possible`.",
    user_id: 5,
  },

  {
    title: "Nigeria issues new guidelines for social media firms",
    post_content:
      "The Nigerian government has issued new guidelines for the operations of social media corporations in the country. \\n The new regulations from the National Information Technology Development Agency (NITDA) will affect popular platforms such as Facebook, Twitter and WhatsApp among others. \\n The code will require the companies to meet certain conditions including registering with the Corporate Affairs Commission and providing the authorities with information about harmful accounts. \\n The NITDA says the aim of the guidelines is to set out best practices expected of interactive platforms, making digital platforms systems safer for users in Nigeria as well as combatting disinformation.",
    user_id: 3,
  },

  {
    title:
      "Golden State Warriors beat Boston Celtics to claim fourth title in eight years",
    post_content:
      "The Warriors won 103-90 in game six in Boston to clinch the series 4-2. \\n Having finished 2019-20 with a dire 15-50 record, they are also the first team to go from the league's worst side to a championship in two years. \\n Stephen Curry, twice the most valuable player in the regular season, was NBA Finals MVP for the first time.\\n The 34-year-old point guard averaged 31.2 points in the six games and scored 34 points in Thursday's win, adding seven assists and seven rebounds.\\n Andrew Wiggins scored 18 points and Jordan Poole 15 as Golden State won the NBA championship for the first time in four years.\\n They also won the title in 2015 and 2017, but lost the 2016 and 2019 finals before missing out on the play-offs in the past two seasons while rebuilding their squad.\\n Kevin Durant left the San Francisco-based franchise as a free agent in 2019, while Curry and Klay Thompson - who scored 12 points on Thursday - were injured during the 2019-20 season.",
    user_id: 2,
  },

  {
    title: "Who would you pick for England's World Cup opener?",
    post_content:
      "The dust has settled on England's disappointing Nations League window in June - and now some minds will turn towards the World Cup. \\n Two defeats by Hungary either side of draws with Germany and Italy might actually have muddied Gareth Southgate's selection choices.\\n England only have two games - against Italy and Germany in the Nations League in September - before the World Cup begins.\\n So if their tournament opener against Iran was being played tomorrow, who would you pick in your XI? \\n Would you go with a similar team to this month or throw in new faces like James Maddison?",
    user_id: 7,
  },

  {
    title: "The Incredible Adventures of the Dallas Tornado",
    post_content:
      "We go back in time to 1967 and 1968 to relive an incredible chapter in football history. The Dallas Tornado World tour. A team of young players went into some of the world's most difficult locations. For six months they travelled 25,000 miles around Africa, Europe, the Middle East, Asia, Australia, and finally Central America.",
    user_id: 5,
  },

  {
    title: "Egypt sack coach Ehab Galal after just three games in charge",
    post_content:
      "The Egyptian Football Association has sacked Ehab Galal as coach after just three games in charge of the national team.\\n Galal, 54, replaced Carlos Queiroz in April after the Pharaohs failed to qualify for the 2022 World Cup.\\n But he was dismissed after a shock 2-0 defeat to Ethiopia in a 2023 Africa Cup of Nations qualifier and 4-1 friendly loss against South Korea.\\n EFA board member Hazem Emam said they will look to appoint a foreign coach.\\n Galal was appointed by Egypt after a season at Cairo-based Pyramids and previously managed several other club sides including Zamalek, El Masry, and Al Ahly Tripoli.\\nIn his first match in charge in June, Egypt claimed a late 1-0 win over Guinea in a Nations Cup qualifier. \\n But the two losses - both missed by their captain and Liverpool forward Mohamed Salah through injury - proved costly for Galal.",
    user_id: 6,
  },
];

const seedSamplePosts = () => Post.bulkCreate(samplePostData);

module.exports = seedSamplePosts;
