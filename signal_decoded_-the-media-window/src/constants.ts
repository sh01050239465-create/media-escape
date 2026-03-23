export type Team = 'Guardians' | 'FactCheckers' | 'Producers' | 'Creatives' | 'Communicators';

export interface Scene {
  id: string;
  title: string;
  avatar: string;
  background: string;
  script: string;
  mission?: string;
  hint?: string;
  errorHint?: string;
  timestamp?: string;
  videoUrl?: string;
  question?: string;
  answer?: string;
}

export const SCENES: Scene[] = [
  {
    id: 'intro',
    title: '요원의 부름',
    avatar: '신뢰감 있는 뉴스 앵커',
    background: 'https://picsum.photos/seed/studio/1920/1080?blur=4',
    script: '반갑습니다, 미래의 미디어 수호대 여러분. 대구시청자미디어센터에 오신 것을 환영합니다. 지금부터 10개의 암호를 풀어 여러분의 팀을 결정해야 합니다. 준비되셨나요?',
  },
  {
    id: 'mission-1',
    title: '개념 확인',
    avatar: '분석 AI',
    background: 'https://picsum.photos/seed/m1/1920/1080?blur=4',
    script: '미디어는 세상을 비추는 거울이자 통로입니다. 첫 번째 암호를 입력하세요.',
    question: '미디어는 우리가 세상을 보는 [ 이것 ]과 같다.',
    answer: '창문',
    hint: '비유 표현을 생각해보세요.',
    errorHint: '세상을 내다보는 투명한 유리로 된 이것! 집이나 교실 벽에도 있죠?',
    videoUrl: 'https://www.youtube.com/embed/Cr0Uv3btEmo'
  },
  {
    id: 'mission-2',
    title: '이유 분석',
    avatar: '분석 AI',
    background: 'https://picsum.photos/seed/m2/1920/1080?blur=4',
    script: '창문이 항상 투명한 것은 아닙니다. 왜 그럴까요?',
    question: '미디어라는 창문이 투명하지 않은 이유는 만드는 사람의 [ 이것 ]이 담기기 때문이다.',
    answer: '관점',
    hint: '주관적인 시각을 뜻하는 단어입니다.',
    errorHint: "만드는 사람의 '생각'이나 '시각'을 뜻하는 두 글자 단어예요. 영상 2분 14초를 다시 보세요!",
    timestamp: '2분 14초',
    videoUrl: 'https://www.youtube.com/embed/Cr0Uv3btEmo'
  },
  {
    id: 'mission-3',
    title: '세대 특징',
    avatar: '분석 AI',
    background: 'https://picsum.photos/seed/m3/1920/1080?blur=4',
    script: '여러분은 태어날 때부터 디지털 기기와 함께했습니다.',
    question: '어릴 때부터 디지털 환경에서 자란 우리 세대를 일컫는 말은?',
    answer: '디지털네이티브',
    hint: '영어로 된 세대 정의 용어입니다.',
    errorHint: "원주민을 뜻하는 '네이티브' 앞에 우리가 매일 쓰는 '디지털'을 붙여보세요.",
    videoUrl: 'https://www.youtube.com/embed/Cr0Uv3btEmo'
  },
  {
    id: 'mission-4',
    title: '데이터 통계',
    avatar: '분석 AI',
    background: 'https://picsum.photos/seed/m4/1920/1080?blur=4',
    script: '우리는 하루 중 얼마나 많은 시간을 미디어와 보낼까요?',
    question: '한국 10대 청소년의 하루 평균 미디어 이용 시간은 약 몇 시간일까?',
    answer: '6시간',
    hint: '숫자와 단위를 포함해 입력하세요 (예: X시간)',
    errorHint: '생각보다 엄청 길죠? 학교 수업 시간과 거의 맞먹는 숫자예요. (숫자만 입력해 봐!)',
    videoUrl: 'https://www.youtube.com/embed/Cr0Uv3btEmo'
  },
  {
    id: 'mission-5',
    title: '위험 감지',
    avatar: '분석 AI',
    background: 'https://picsum.photos/seed/m5/1920/1080?blur=4',
    script: '잘못된 정보는 독이 될 수 있습니다.',
    question: "미디어 리터러시가 부족할 때 빠지기 쉬운 '잘못된 정보'를 뜻하는 말은?",
    answer: '가짜뉴스',
    hint: '허위 정보를 일컫는 흔한 용어입니다.',
    errorHint: '진짜처럼 보이지만 사실이 아닌 뉴스! 허위 정보라고도 불려요.',
    videoUrl: 'https://www.youtube.com/embed/Cr0Uv3btEmo'
  },
  {
    id: 'mission-6',
    title: '정의 확립',
    avatar: '분석 AI',
    background: 'https://picsum.photos/seed/m6/1920/1080?blur=4',
    script: '우리가 배우고 있는 이 능력의 이름은 무엇일까요?',
    question: '정보를 비판적으로 이해하고 책임 있게 소통하는 능력의 전체 이름은?',
    answer: '미디어리터러시',
    hint: '이 교육의 핵심 키워드입니다.',
    errorHint: "오늘 수업의 주인공! '미디어' 뒤에 정보를 읽고 쓰는 능력인 '리터러시'를 붙여보세요.",
    videoUrl: 'https://www.youtube.com/embed/Cr0Uv3btEmo'
  },
  {
    id: 'mission-7',
    title: '필수 태도',
    avatar: '분석 AI',
    background: 'https://picsum.photos/seed/m7/1920/1080?blur=4',
    script: '그대로 믿지 마세요. 의심하고 분석하세요.',
    question: '정보를 접할 때 그대로 믿지 않고 사실 여부를 따져보는 사고방식은?',
    answer: '비판적사고',
    hint: '객관적으로 따져보는 능력입니다.',
    errorHint: "무조건 믿지 않고 '왜 그럴까?'라고 꼼꼼히 따져보는 사고방식이에요.",
    videoUrl: 'https://www.youtube.com/embed/Cr0Uv3btEmo'
  },
  {
    id: 'mission-8',
    title: '가치 목표',
    avatar: '분석 AI',
    background: 'https://picsum.photos/seed/m8/1920/1080?blur=4',
    script: '우리는 어떤 사람이 되어야 할까요?',
    question: '올바른 미디어 수용 능력을 갖춘 사람이 성장하게 되는 미래의 모습은?',
    answer: '민주시민',
    hint: '사회의 구성원으로서의 올바른 모습입니다.',
    errorHint: "우리 사회의 올바른 구성원을 뜻하는 말! '민주'적인 '시민'입니다.",
    videoUrl: 'https://www.youtube.com/embed/Cr0Uv3btEmo'
  },
  {
    id: 'mission-9',
    title: '팀 배정 테스트',
    avatar: '분석 AI',
    background: 'https://picsum.photos/seed/m9/1920/1080?blur=4',
    script: '이제 여러분의 성향을 파악할 시간입니다. 가장 솔직한 답변을 선택하세요.',
    question: '뉴스를 볼 때 내가 가장 먼저 하는 행동은?',
    answer: 'CHOICE', // Special handling for choices
    hint: 'A: 사실 확인, B: 댓글 확인, C: 공유하기, D: 내용 요약',
    videoUrl: 'https://www.youtube.com/embed/Cr0Uv3btEmo'
  },
  {
    id: 'mission-10',
    title: '최종 결심',
    avatar: '분석 AI',
    background: 'https://picsum.photos/seed/m10/1920/1080?blur=4',
    script: "마지막 관문입니다. 진실을 보기 위해 당신에게 필요한 것은 무엇입니까?",
    question: '미디어를 통해 세상의 진짜 모습을 보기 위해 나에게 가장 필요한 도구는?',
    answer: '안목',
    hint: '또는 "생각"이라고 입력해도 좋습니다.',
    errorHint: "사물을 보고 판단하는 눈! 두 글자로 '안목'이 높다고 하죠.",
    videoUrl: 'https://www.youtube.com/embed/Cr0Uv3btEmo'
  },
  {
    id: 'ending',
    title: '팀 배정 선언',
    avatar: '환하게 웃으며 격려하는 팀장',
    background: 'https://picsum.photos/seed/celebration/1920/1080?blur=2',
    script: '10개의 관문을 모두 통과했습니다! 이제 여러분의 성향 데이터가 분석되었습니다. 팩트체크팀, 프로듀서팀, 가디언즈팀... 화면에 뜬 여러분의 팀 이름을 확인하고, 4~5명씩 대오를 갖춰 집결하십시오. 미디어 수호대, 활동 개시!',
  }
];
