import { ChatData, Message } from '@/types/chat';

const EMOJI_MEANINGS: Record<string, string> = {
  '❤️': 'Red Heart',
  '🧡': 'Orange Heart',
  '💛': 'Yellow Heart',
  '💚': 'Green Heart',
  '💙': 'Blue Heart',
  '💜': 'Purple Heart',
  '🖤': 'Black Heart',
  '🤍': 'White Heart',
  '🤎': 'Brown Heart',
  '💔': 'Broken Heart',
  '❣️': 'Heavy Heart Exclamation',
  '💕': 'Two Hearts',
  '💞': 'Revolving Hearts',
  '💓': 'Beating Heart',
  '💗': 'Growing Heart',
  '💖': 'Sparkling Heart',
  '💘': 'Heart with Arrow',
  '💝': 'Heart with Ribbon',
  '💟': 'Heart Decoration',
  '❤️‍🔥': 'Heart on Fire',
  '❤️‍🩹': 'Mending Heart',
  '💋': 'Kiss Mark',
  '💌': 'Love Letter',
  '😀': 'Grinning Face',
  '😃': 'Grinning Face with Big Eyes',
  '😄': 'Grinning Face with Smiling Eyes',
  '😁': 'Beaming Face with Smiling Eyes',
  '😆': 'Grinning Squinting Face',
  '😅': 'Grinning Face with Sweat',
  '🤣': 'Rolling on the Floor Laughing',
  '😂': 'Face with Tears of Joy',
  '🙂': 'Slightly Smiling Face',
  '🙃': 'Upside-Down Face',
  '😉': 'Winking Face',
  '😊': 'Smiling Face with Smiling Eyes',
  '😇': 'Smiling Face with Halo',
  '🥰': 'Smiling Face with Hearts',
  '😍': 'Smiling Face with Heart-Eyes',
  '🤩': 'Star-Struck',
  '😘': 'Face Blowing a Kiss',
  '😗': 'Kissing Face',
  '☺️': 'Smiling Face',
  '😚': 'Kissing Face with Closed Eyes',
  '😙': 'Kissing Face with Smiling Eyes',
  '🥲': 'Smiling Face with Tear',
  '😋': 'Face Savoring Food',
  '😛': 'Face with Tongue',
  '😜': 'Winking Face with Tongue',
  '🤪': 'Zany Face',
  '😝': 'Squinting Face with Tongue',
  '🤑': 'Money-Mouth Face',
  '🤗': 'Hugging Face',
  '🤭': 'Face with Hand Over Mouth',
  '🤫': 'Shushing Face',
  '🤔': 'Thinking Face',
  '🤐': 'Zipper-Mouth Face',
  '🤨': 'Face with Raised Eyebrow',
  '😐': 'Neutral Face',
  '😑': 'Expressionless Face',
  '😶': 'Face Without Mouth',
  '😶‍🌫️': 'Face in Clouds',
  '😏': 'Smirking Face',
  '😒': 'Unamused Face',
  '🙄': 'Face with Rolling Eyes',
  '😬': 'Grimacing Face',
  '😮‍💨': 'Face Exhaling',
  '🤥': 'Lying Face',
  '😔': 'Pensive Face',
  '😪': 'Sleepy Face',
  '🤤': 'Drooling Face',
  '😴': 'Sleeping Face',
  '😷': 'Face with Medical Mask',
  '🤒': 'Face with Thermometer',
  '🤕': 'Face with Head-Bandage',
  '🤢': 'Nauseated Face',
  '🤮': 'Face Vomiting',
  '🤧': 'Sneezing Face',
  '🥵': 'Hot Face',
  '🥶': 'Cold Face',
  '🥴': 'Woozy Face',
  '😵': 'Dizzy Face',
  '😵‍💫': 'Face with Spiral Eyes',
  '🤯': 'Exploding Head',
  '🤠': 'Cowboy Hat Face',
  '🥳': 'Partying Face',
  '🥸': 'Disguised Face',
  '😎': 'Smiling Face with Sunglasses',
  '🤓': 'Nerd Face',
  '🧐': 'Face with Monocle',
  '😕': 'Confused Face',
  '😟': 'Worried Face',
  '🙁': 'Slightly Frowning Face',
  '☹️': 'Frowning Face',
  '😮': 'Face with Open Mouth',
  '😯': 'Hushed Face',
  '😲': 'Astonished Face',
  '😳': 'Flushed Face',
  '🥺': 'Pleading Face',
  '😦': 'Frowning Face with Open Mouth',
  '😧': 'Anguished Face',
  '😨': 'Fearful Face',
  '😰': 'Anxious Face with Sweat',
  '😥': 'Sad but Relieved Face',
  '😢': 'Crying Face',
  '😭': 'Loudly Crying Face',
  '😱': 'Face Screaming in Fear',
  '😖': 'Confounded Face',
  '😣': 'Persevering Face',
  '😞': 'Disappointed Face',
  '😓': 'Downcast Face with Sweat',
  '😩': 'Weary Face',
  '😫': 'Tired Face',
  '🥱': 'Yawning Face',
  '😤': 'Face with Steam From Nose',
  '😡': 'Pouting Face',
  '😠': 'Angry Face',
  '🤬': 'Face with Symbols on Mouth',
  '😈': 'Smiling Face with Horns',
  '👿': 'Angry Face with Horns',
  '💀': 'Skull',
  '☠️': 'Skull and Crossbones',
  '💩': 'Pile of Poo',
  '🤡': 'Clown Face',
  '👹': 'Ogre',
  '👺': 'Goblin',
  '👻': 'Ghost',
  '👽': 'Alien',
  '👾': 'Alien Monster',
  '🤖': 'Robot',
  '😺': 'Grinning Cat',
  '😸': 'Grinning Cat with Smiling Eyes',
  '😹': 'Cat with Tears of Joy',
  '😻': 'Smiling Cat with Heart-Eyes',
  '😼': 'Cat with Wry Smile',
  '😽': 'Kissing Cat',
  '🙀': 'Weary Cat',
  '😿': 'Crying Cat',
  '😾': 'Pouting Cat',
  '🙈': 'See-No-Evil Monkey',
  '🙉': 'Hear-No-Evil Monkey',
  '🙊': 'Speak-No-Evil Monkey',
  '💯': 'Hundred Points Symbol',
  '💢': 'Anger Symbol',
  '💥': 'Collision',
  '💫': 'Dizzy',
  '💦': 'Sweat Droplets',
  '💨': 'Dashing Away',
  '🕳️': 'Hole',
  '💣': 'Bomb',
  '💬': 'Speech Balloon',
  '👁️‍🗨️': 'Eye in Speech Bubble',
  '🗨️': 'Left Speech Bubble',
  '🗯️': 'Right Anger Bubble',
  '💭': 'Thought Balloon',
  '💤': 'Zzz',
  '👋': 'Waving Hand',
  '🤚': 'Raised Back of Hand',
  '🖐️': 'Hand with Fingers Splayed',
  '✋': 'Raised Hand',
  '🖖': 'Vulcan Salute',
  '👌': 'OK Hand',
  '🤌': 'Pinched Fingers',
  '🤏': 'Pinching Hand',
  '✌️': 'Victory Hand',
  '🤞': 'Crossed Fingers',
  '🤟': 'Love-You Gesture',
  '🤘': 'Sign of the Horns',
  '🤙': 'Call Me Hand',
  '👈': 'Backhand Index Pointing Left',
  '👉': 'Backhand Index Pointing Right',
  '👆': 'Backhand Index Pointing Up',
  '🖕': 'Middle Finger',
  '👇': 'Backhand Index Pointing Down',
  '☝️': 'Index Pointing Up',
  '👍': 'Thumbs Up',
  '👎': 'Thumbs Down',
  '✊': 'Raised Fist',
  '👊': 'Oncoming Fist',
  '🤛': 'Left-Facing Fist',
  '🤜': 'Right-Facing Fist',
  '👏': 'Clapping Hands',
  '🙌': 'Raising Hands',
  '👐': 'Open Hands',
  '🤲': 'Palms Up Together',
  '🤝': 'Handshake',
  '🙏': 'Folded Hands',
  '✍️': 'Writing Hand',
  '💅': 'Nail Polish',
  '🤳': 'Selfie',
  '💪': 'Flexed Biceps',
  '🦾': 'Mechanical Arm',
  '🦿': 'Mechanical Leg',
  '🦵': 'Leg',
  '🦶': 'Foot',
  '👂': 'Ear',
  '🦻': 'Ear with Hearing Aid',
  '👃': 'Nose',
  '🧠': 'Brain',
  '🫀': 'Anatomical Heart',
  '🫁': 'Lungs',
  '🦷': 'Tooth',
  '🦴': 'Bone',
  '👀': 'Eyes',
  '👁️': 'Eye',
  '👅': 'Tongue',
  '👄': 'Mouth',
  '👶': 'Baby',
  '🧒': 'Child',
  '👦': 'Boy',
  '👧': 'Girl',
  '🧑': 'Person',
  '👱': 'Person: Blond Hair',
  '👨': 'Man',
  '🧔': 'Person: Beard',
  '🧔‍♂️': 'Man: Beard',
  '🧔‍♀️': 'Woman: Beard',
  '👨‍🦰': 'Man: Red Hair',
  '👨‍🦱': 'Man: Curly Hair',
  '👨‍🦳': 'Man: White Hair',
  '👨‍🦲': 'Man: Bald',
  '👩': 'Woman',
  '👩‍🦰': 'Woman: Red Hair',
  '🧑‍🦰': 'Person: Red Hair',
  '👩‍🦱': 'Woman: Curly Hair',
  '🧑‍🦱': 'Person: Curly Hair',
  '👩‍🦳': 'Woman: White Hair',
  '🧑‍🦳': 'Person: White Hair',
  '👩‍🦲': 'Woman: Bald',
  '🧑‍🦲': 'Person: Bald',
  '👱‍♀️': 'Woman: Blond Hair',
  '👱‍♂️': 'Man: Blond Hair',
  '🧓': 'Older Person',
  '👴': 'Old Man',
  '👵': 'Old Woman',
  '🙍': 'Person Frowning',
  '🙍‍♂️': 'Man Frowning',
  '🙍‍♀️': 'Woman Frowning',
  '🙎': 'Person Pouting',
  '🙎‍♂️': 'Man Pouting',
  '🙎‍♀️': 'Woman Pouting',
  '🙅': 'Person Gesturing No',
  '🙅‍♂️': 'Man Gesturing No',
  '🙅‍♀️': 'Woman Gesturing No',
  '🙆': 'Person Gesturing OK',
  '🙆‍♂️': 'Man Gesturing OK',
  '🙆‍♀️': 'Woman Gesturing OK',
  '💁': 'Person Tipping Hand',
  '💁‍♂️': 'Man Tipping Hand',
  '💁‍♀️': 'Woman Tipping Hand',
  '🙋': 'Person Raising Hand',
  '🙋‍♂️': 'Man Raising Hand',
  '🙋‍♀️': 'Woman Raising Hand',
  '🧏': 'Deaf Person',
  '🧏‍♂️': 'Deaf Man',
  '🧏‍♀️': 'Deaf Woman',
  '🙇': 'Person Bowing',
  '🙇‍♂️': 'Man Bowing',
  '🙇‍♀️': 'Woman Bowing',
  '🤦': 'Person Facepalming',
  '🤦‍♂️': 'Man Facepalming',
  '🤦‍♀️': 'Woman Facepalming',
  '🤷': 'Person Shrugging',
  '🤷‍♂️': 'Man Shrugging',
  '🤷‍♀️': 'Woman Shrugging',
  '🧑‍⚕️': 'Health Worker',
  '👨‍⚕️': 'Man Health Worker',
  '👩‍⚕️': 'Woman Health Worker',
  '🧑‍🎓': 'Student',
  '👨‍🎓': 'Man Student',
  '👩‍🎓': 'Woman Student',
  '🧑‍🏫': 'Teacher',
  '👨‍🏫': 'Man Teacher',
  '👩‍🏫': 'Woman Teacher',
  '🧑‍⚖️': 'Judge',
  '👨‍⚖️': 'Man Judge',
  '👩‍⚖️': 'Woman Judge',
  '🧑‍🌾': 'Farmer',
  '👨‍🌾': 'Man Farmer',
  '👩‍🌾': 'Woman Farmer',
  '🧑‍🍳': 'Cook',
  '👨‍🍳': 'Man Cook',
  '👩‍🍳': 'Woman Cook',
  '🧑‍🔧': 'Mechanic',
  '👨‍🔧': 'Man Mechanic',
  '👩‍🔧': 'Woman Mechanic',
  '🧑‍🏭': 'Factory Worker',
  '👨‍🏭': 'Man Factory Worker',
  '👩‍🏭': 'Woman Factory Worker',
  '🧑‍💼': 'Office Worker',
  '👨‍💼': 'Man Office Worker',
  '👩‍💼': 'Woman Office Worker',
  '🧑‍🔬': 'Scientist',
  '👨‍🔬': 'Man Scientist',
  '👩‍🔬': 'Woman Scientist',
  '🧑‍💻': 'Technologist',
  '👨‍💻': 'Man Technologist',
  '👩‍💻': 'Woman Technologist',
  '🧑‍🎤': 'Singer',
  '👨‍🎤': 'Man Singer',
  '👩‍🎤': 'Woman Singer',
  '🧑‍🎨': 'Artist',
  '👨‍🎨': 'Man Artist',
  '👩‍🎨': 'Woman Artist',
  '🧑‍✈️': 'Pilot',
  '👨‍✈️': 'Man Pilot',
  '👩‍✈️': 'Woman Pilot',
  '🧑‍🚀': 'Astronaut',
  '👨‍🚀': 'Man Astronaut',
  '👩‍🚀': 'Woman Astronaut',
  '🧑‍🚒': 'Firefighter',
  '👨‍🚒': 'Man Firefighter',
  '👩‍🚒': 'Woman Firefighter',
  '👮': 'Police Officer',
  '👮‍♂️': 'Man Police Officer',
  '👮‍♀️': 'Woman Police Officer',
  '🕵️': 'Detective',
  '🕵️‍♂️': 'Man Detective',
  '🕵️‍♀️': 'Woman Detective',
  '💂': 'Guard',
  '💂‍♂️': 'Man Guard',
  '💂‍♀️': 'Woman Guard',
  '🥷': 'Ninja',
  '👷': 'Construction Worker',
  '👷‍♂️': 'Man Construction Worker',
  '👷‍♀️': 'Woman Construction Worker',
  '🤴': 'Prince',
  '👸': 'Princess',
  '👳': 'Person Wearing Turban',
  '👳‍♂️': 'Man Wearing Turban',
  '👳‍♀️': 'Woman Wearing Turban',
  '👲': 'Person with Skullcap',
  '🧕': 'Woman with Headscarf',
  '🤵': 'Person in Tuxedo',
  '🤵‍♂️': 'Man in Tuxedo',
  '🤵‍♀️': 'Woman in Tuxedo',
  '👰': 'Person with Veil',
  '👰‍♂️': 'Man with Veil',
  '👰‍♀️': 'Woman with Veil',
  '🤰': 'Pregnant Woman',
  '🤱': 'Breast-Feeding',
  '👩‍🍼': 'Woman Feeding Baby',
  '👨‍🍼': 'Man Feeding Baby',
  '🧑‍🍼': 'Person Feeding Baby',
  '👼': 'Baby Angel',
  '🎅': 'Santa Claus',
  '🤶': 'Mrs. Claus',
  '🧑‍🎄': 'Mx Claus',
  '🦸': 'Superhero',
  '🦸‍♂️': 'Man Superhero',
  '🦸‍♀️': 'Woman Superhero',
  '🦹': 'Supervillain',
  '🦹‍♂️': 'Man Supervillain',
  '🦹‍♀️': 'Woman Supervillain',
  '🧙': 'Mage',
  '🧙‍♂️': 'Man Mage',
  '🧙‍♀️': 'Woman Mage',
  '🧚': 'Fairy',
  '🧚‍♂️': 'Man Fairy',
  '🧚‍♀️': 'Woman Fairy',
  '🧛': 'Vampire',
  '🧛‍♂️': 'Man Vampire',
  '🧛‍♀️': 'Woman Vampire',
  '🧜': 'Merperson',
  '🧜‍♂️': 'Merman',
  '🧜‍♀️': 'Mermaid',
  '🧝': 'Elf',
  '🧝‍♂️': 'Man Elf',
  '🧝‍♀️': 'Woman Elf',
  '🧞': 'Genie',
  '🧞‍♂️': 'Man Genie',
  '🧞‍♀️': 'Woman Genie',
  '🧟': 'Zombie',
  '🧟‍♂️': 'Man Zombie',
  '🧟‍♀️': 'Woman Zombie',
  '💆': 'Person Getting Massage',
  '💆‍♂️': 'Man Getting Massage',
  '💆‍♀️': 'Woman Getting Massage',
  '💇': 'Person Getting Haircut',
  '💇‍♂️': 'Man Getting Haircut',
  '💇‍♀️': 'Woman Getting Haircut',
  '🚶': 'Person Walking',
  '🚶‍♂️': 'Man Walking',
  '🚶‍♀️': 'Woman Walking',
  '🧍': 'Person Standing',
  '🧍‍♂️': 'Man Standing',
  '🧍‍♀️': 'Woman Standing',
  '🧎': 'Person Kneeling',
  '🧎‍♂️': 'Man Kneeling',
  '🧎‍♀️': 'Woman Kneeling',
  '🧑‍🦯': 'Person with White Cane',
  '👨‍🦯': 'Man with White Cane',
  '👩‍🦯': 'Woman with White Cane',
  '🧑‍🦼': 'Person in Motorized Wheelchair',
  '👨‍🦼': 'Man in Motorized Wheelchair',
  '👩‍🦼': 'Woman in Motorized Wheelchair',
  '🧑‍🦽': 'Person in Manual Wheelchair',
  '👨‍🦽': 'Man in Manual Wheelchair',
  '👩‍🦽': 'Woman in Manual Wheelchair',
  '🏃': 'Person Running',
  '🏃‍♂️': 'Man Running',
  '🏃‍♀️': 'Woman Running',
  '💃': 'Woman Dancing',
  '🕺': 'Man Dancing',
  '🕴️': 'Person in Suit Levitating',
  '👯': 'People with Bunny Ears',
  '👯‍♂️': 'Men with Bunny Ears',
  '👯‍♀️': 'Women with Bunny Ears',
  '🧖': 'Person in Steamy Room',
  '🧖‍♂️': 'Man in Steamy Room',
  '🧖‍♀️': 'Woman in Steamy Room',
  '🧗': 'Person Climbing',
  '🧗‍♂️': 'Man Climbing',
  '🧗‍♀️': 'Woman Climbing',
  '🤺': 'Person Fencing',
  '🏇': 'Horse Racing',
  '⛷️': 'Skier',
  '🏂': 'Snowboarder',
  '🏌️': 'Person Golfing',
  '🏌️‍♂️': 'Man Golfing',
  '🏌️‍♀️': 'Woman Golfing',
  '🏄': 'Person Surfing',
  '🏄‍♂️': 'Man Surfing',
  '🏄‍♀️': 'Woman Surfing',
  '🚣': 'Person Rowing Boat',
  '🚣‍♂️': 'Man Rowing Boat',
  '🚣‍♀️': 'Woman Rowing Boat',
  '🏊': 'Person Swimming',
  '🏊‍♂️': 'Man Swimming',
  '🏊‍♀️': 'Woman Swimming',
  '⛹️': 'Person Bouncing Ball',
  '⛹️‍♂️': 'Man Bouncing Ball',
  '⛹️‍♀️': 'Woman Bouncing Ball',
  '🏋️': 'Person Lifting Weights',
  '🏋️‍♂️': 'Man Lifting Weights',
  '🏋️‍♀️': 'Woman Lifting Weights',
  '🚴': 'Person Biking',
  '🚴‍♂️': 'Man Biking',
  '🚴‍♀️': 'Woman Biking',
  '🚵': 'Person Mountain Biking',
  '🚵‍♂️': 'Man Mountain Biking',
  '🚵‍♀️': 'Woman Mountain Biking',
  '🤸': 'Person Cartwheeling',
  '🤸‍♂️': 'Man Cartwheeling',
  '🤸‍♀️': 'Woman Cartwheeling',
  '🤼': 'People Wrestling',
  '🤼‍♂️': 'Men Wrestling',
  '🤼‍♀️': 'Women Wrestling',
  '🤽': 'Person Playing Water Polo',
  '🤽‍♂️': 'Man Playing Water Polo',
  '🤽‍♀️': 'Woman Playing Water Polo',
  '🤾': 'Person Playing Handball',
  '🤾‍♂️': 'Man Playing Handball',
  '🤾‍♀️': 'Woman Playing Handball',
  '🤹': 'Person Juggling',
  '🤹‍♂️': 'Man Juggling',
  '🤹‍♀️': 'Woman Juggling',
  '🧘': 'Person in Lotus Position',
  '🧘‍♂️': 'Man in Lotus Position',
  '🧘‍♀️': 'Woman in Lotus Position',
  '🛀': 'Person Taking Bath',
  '🛌': 'Person in Bed',
  '🧑‍🤝‍🧑': 'People Holding Hands',
  '👭': 'Women Holding Hands',
  '👫': 'Woman and Man Holding Hands',
  '👬': 'Men Holding Hands',
  '💏': 'Kiss',
  '👩‍❤️‍💋‍👨': 'Kiss: Woman, Man',
  '👨‍❤️‍💋‍👨': 'Kiss: Man, Man',
  '👩‍❤️‍💋‍👩': 'Kiss: Woman, Woman',
  '💑': 'Couple with Heart',
  '👩‍❤️‍👨': 'Couple with Heart: Woman, Man',
  '👨‍❤️‍👨': 'Couple with Heart: Man, Man',
  '👩‍❤️‍👩': 'Couple with Heart: Woman, Woman',
  '👪': 'Family',
  '👨‍👩‍👦': 'Family: Man, Woman, Boy',
  '👨‍👩‍👧': 'Family: Man, Woman, Girl',
  '👨‍👩‍👧‍👦': 'Family: Man, Woman, Girl, Boy',
  '👨‍👩‍👦‍👦': 'Family: Man, Woman, Boy, Boy',
  '👨‍👩‍👧‍👧': 'Family: Man, Woman, Girl, Girl',
  '👨‍👨‍👦': 'Family: Man, Man, Boy',
  '👨‍👨‍👧': 'Family: Man, Man, Girl',
  '👨‍👨‍👧‍👦': 'Family: Man, Man, Girl, Boy',
  '👨‍👨‍👦‍👦': 'Family: Man, Man, Boy, Boy',
  '👨‍👨‍👧‍👧': 'Family: Man, Man, Girl, Girl',
  '👩‍👩‍👦': 'Family: Woman, Woman, Boy',
  '👩‍👩‍👧': 'Family: Woman, Woman, Girl',
  '👩‍👩‍👧‍👦': 'Family: Woman, Woman, Girl, Boy',
  '👩‍👩‍👦‍👦': 'Family: Woman, Woman, Boy, Boy',
  '👩‍👩‍👧‍👧': 'Family: Woman, Woman, Girl, Girl',
  '👨‍👦': 'Family: Man, Boy',
  '👨‍👦‍👦': 'Family: Man, Boy, Boy',
  '👨‍👧': 'Family: Man, Girl',
  '👨‍👧‍👦': 'Family: Man, Girl, Boy',
  '👨‍👧‍👧': 'Family: Man, Girl, Girl',
  '👩‍👦': 'Family: Woman, Boy',
  '👩‍👦‍👦': 'Family: Woman, Boy, Boy',
  '👩‍👧': 'Family: Woman, Girl',
  '👩‍👧‍👦': 'Family: Woman, Girl, Boy',
  '👩‍👧‍👧': 'Family: Woman, Girl, Girl',
  '🗣️': 'Speaking Head',
  '👤': 'Bust in Silhouette',
  '👥': 'Busts in Silhouette',
  '🫂': 'People Hugging',
  '👣': 'Footprints',
  '🔥': 'Fire',
  '🌹': 'Rose',
  '🌟': 'Star',
  '✨': 'Sparkles',
  '🦋': 'Butterfly',
  '🌙': 'Crescent Moon',
  '☮️': 'Peace Symbol',
  '✝️': 'Latin Cross',
  '☪️': 'Star and Crescent',
  '🕉️': 'Om',
  '☸️': 'Wheel of Dharma',
  '✡️': 'Star of David',
  '🔯': 'Dotted Six-Pointed Star',
  '🕎': 'Menorah',
  '☯️': 'Yin Yang',
  '☦️': 'Orthodox Cross',
  '🛐': 'Place of Worship',
  '⛎': 'Ophiuchus',
  '♈': 'Aries',
  '♉': 'Taurus',
  '♊': 'Gemini',
  '♋': 'Cancer',
  '♌': 'Leo',
  '♍': 'Virgo',
  '♎': 'Libra',
  '♏': 'Scorpio',
  '♐': 'Sagittarius',
  '♑': 'Capricorn',
  '♒': 'Aquarius',
  '♓': 'Pisces',
  '🆔': 'ID Button',
  '⚛️': 'Atom Symbol',
  '🉑': 'Japanese Acceptable Button',
  '☢️': 'Radioactive',
  '☣️': 'Biohazard',
  '📴': 'Mobile Phone Off',
  '📳': 'Vibration Mode',
  '🈶': 'Japanese Not Free of Charge Button',
  '🈚': 'Japanese Free of Charge Button',
  '🈸': 'Japanese Application Button',
  '🈺': 'Japanese Open for Business Button',
  '🈷️': 'Japanese Monthly Amount Button',
  '✴️': 'Eight-Pointed Star',
  '🆚': 'VS Button',
  '💮': 'White Flower',
  '🉐': 'Japanese Bargain Button',
  '㊙️': 'Japanese Secret Button',
  '㊗️': 'Japanese Congratulations Button',
  '🈴': 'Japanese Passing Grade Button',
  '🈵': 'Japanese No Vacancy Button',
  '🈹': 'Japanese Discount Button',
  '🈲': 'Japanese Prohibited Button',
  '🅰️': 'A Button (Blood Type)',
  '🅱️': 'B Button (Blood Type)',
  '🆎': 'AB Button (Blood Type)',
  '🆑': 'CL Button',
  '🅾️': 'O Button (Blood Type)',
  '🆘': 'SOS Button',
  '❌': 'Cross Mark',
  '⭕': 'Hollow Red Circle',
  '🛑': 'Stop Sign',
  '⛔': 'No Entry',
  '📛': 'Name Badge',
  '🚫': 'Prohibited',
  '♨️': 'Hot Springs',
  '🚷': 'No Pedestrians',
  '🚯': 'No Littering',
  '🚳': 'No Bicycles',
  '🚱': 'Non-Potable Water',
  '🔞': 'No One Under Eighteen',
  '📵': 'No Mobile Phones',
  '🚭': 'No Smoking',
  '❗': 'Exclamation Mark',
  '❕': 'White Exclamation Mark',
  '❓': 'Question Mark',
  '❔': 'White Question Mark',
  '‼️': 'Double Exclamation Mark',
  '⁉️': 'Exclamation Question Mark',
  '🔅': 'Dim Button',
  '🔆': 'Bright Button',
  '〽️': 'Part Alternation Mark',
  '⚠️': 'Warning',
  '🚸': 'Children Crossing',
  '🔱': 'Trident Emblem',
  '⚜️': 'Fleur-de-lis',
  '🔰': 'Japanese Symbol for Beginner',
  '♻️': 'Recycling Symbol',
  '✅': 'Check Mark Button',
  '🈯': 'Japanese Reserved Button',
  '💹': 'Chart Increasing with Yen',
  '❇️': 'Sparkle',
  '✳️': 'Eight-Spoked Asterisk',
  '❎': 'Cross Mark Button',
  '🌐': 'Globe with Meridians',
  '💠': 'Diamond with a Dot',
  'Ⓜ️': 'Circled M',
  '🌀': 'Cyclone',
  '🏧': 'ATM Sign',
  '🚾': 'Water Closet',
  '♿': 'Wheelchair Symbol',
  '🅿️': 'P Button',
  '🈳': 'Japanese Vacancy Button',
  '🈂️': 'Japanese Service Charge Button',
  '🛂': 'Passport Control',
  '🛃': 'Customs',
  '🛄': 'Baggage Claim',
  '🛅': 'Left Luggage',
  '🚹': 'Mens Symbol',
  '🚺': 'Womens Symbol',
  '🚼': 'Baby Symbol',
  '🚻': 'Restroom',
  '🚮': 'Litter in Bin Sign',
  '🎦': 'Cinema',
  '📶': 'Antenna Bars',
  '🈁': 'Japanese Here Button',
  '🔣': 'Input Symbols',
  'ℹ️': 'Information',
  '🔤': 'Input Latin Letters',
  '🔡': 'Input Latin Lowercase',
  '🔠': 'Input Latin Uppercase',
  '🆖': 'NG Button',
  '🆗': 'OK Button',
  '🆙': 'UP! Button',
  '🆒': 'Cool Button',
  '🆕': 'New Button',
  '🆓': 'Free Button',
  '0️⃣': 'Keycap Digit Zero',
  '1️⃣': 'Keycap Digit One',
  '2️⃣': 'Keycap Digit Two',
  '3️⃣': 'Keycap Digit Three',
  '4️⃣': 'Keycap Digit Four',
  '5️⃣': 'Keycap Digit Five',
  '6️⃣': 'Keycap Digit Six',
  '7️⃣': 'Keycap Digit Seven',
  '8️⃣': 'Keycap Digit Eight',
  '9️⃣': 'Keycap Digit Nine',
  '🔟': 'Keycap 10',
  '🔢': 'Input Numbers',
  '#️⃣': 'Keycap Number Sign',
  '*️⃣': 'Keycap Asterisk',
  '⏏️': 'Eject Button',
  '▶️': 'Play Button',
  '⏸️': 'Pause Button',
  '⏯️': 'Play or Pause Button',
  '⏹️': 'Stop Button',
  '⏺️': 'Record Button',
  '⏭️': 'Next Track Button',
  '⏮️': 'Last Track Button',
  '⏩': 'Fast-Forward Button',
  '⏪': 'Fast Reverse Button',
  '⏫': 'Fast Up Button',
  '⏬': 'Fast Down Button',
  '◀️': 'Reverse Button',
  '🔼': 'Upwards Button',
  '🔽': 'Downwards Button',
  '➡️': 'Right Arrow',
  '⬅️': 'Left Arrow',
  '⬆️': 'Up Arrow',
  '⬇️': 'Down Arrow',
  '↗️': 'Up-Right Arrow',
  '↘️': 'Down-Right Arrow',
  '↙️': 'Down-Left Arrow',
  '↖️': 'Up-Left Arrow',
  '↕️': 'Up-Down Arrow',
  '↔️': 'Left-Right Arrow',
  '↪️': 'Right Arrow Curving Left',
  '↩️': 'Left Arrow Curving Right',
  '⤴️': 'Right Arrow Curving Up',
  '⤵️': 'Right Arrow Curving Down',
  '🔀': 'Twisted Rightwards Arrows',
  '🔁': 'Repeat Button',
  '🔂': 'Repeat Single Button',
  '🔄': 'Counterclockwise Arrows Button',
  '🔃': 'Clockwise Vertical Arrows',
  '🎵': 'Musical Note',
  '🎶': 'Musical Notes',
  '➕': 'Plus',
  '➖': 'Minus',
  '➗': 'Divide',
  '✖️': 'Multiply',
  '♾️': 'Infinity',
  '💲': 'Heavy Dollar Sign',
  '💱': 'Currency Exchange',
  '™️': 'Trade Mark',
  '©️': 'Copyright',
  '®️': 'Registered',
  '〰️': 'Wavy Dash',
  '➰': 'Curly Loop',
  '➿': 'Double Curly Loop',
  '🔚': 'END Arrow',
  '🔙': 'BACK Arrow',
  '🔛': 'ON! Arrow',
  '🔝': 'TOP Arrow',
  '🔜': 'SOON Arrow',
  '✔️': 'Check Mark',
  '☑️': 'Check Box with Check',
  '🔘': 'Radio Button',
  '🔴': 'Red Circle',
  '🟠': 'Orange Circle',
  '🟡': 'Yellow Circle',
  '🟢': 'Green Circle',
  '🔵': 'Blue Circle',
  '🟣': 'Purple Circle',
  '⚫': 'Black Circle',
  '⚪': 'White Circle',
  '🟤': 'Brown Circle',
  '🔺': 'Red Triangle Pointed Up',
  '🔻': 'Red Triangle Pointed Down',
  '🔸': 'Small Orange Diamond',
  '🔹': 'Small Blue Diamond',
  '🔶': 'Large Orange Diamond',
  '🔷': 'Large Blue Diamond',
  '🔳': 'White Square Button',
  '🔲': 'Black Square Button',
  '▪️': 'Black Small Square',
  '▫️': 'White Small Square',
  '◾': 'Black Medium-Small Square',
  '◽': 'White Medium-Small Square',
  '◼️': 'Black Medium Square',
  '◻️': 'White Medium Square',
  '⬛': 'Black Large Square',
  '⬜': 'White Large Square',
  '🟫': 'Brown Square',
  '🟪': 'Purple Square',
  '🟦': 'Blue Square',
  '🟩': 'Green Square',
  '🟨': 'Yellow Square',
  '🟧': 'Orange Square',
  '🟥': 'Red Square',
  '🔈': 'Speaker Low Volume',
  '🔇': 'Muted Speaker',
  '🔉': 'Speaker Medium Volume',
  '🔊': 'Speaker High Volume',
  '📢': 'Loudspeaker',
  '📣': 'Megaphone',
  '📯': 'Postal Horn',
  '🔔': 'Bell',
  '🔕': 'Bell with Slash',
};

export function parseWhatsAppChat(content: string): ChatData {
  const lines = content.split('\n').filter(line => line.trim());
  const messages: Message[] = [];
  const participants = new Set<string>();

  // WhatsApp date pattern: [DD/MM/YYYY, HH:MM:SS] or [M/D/YY, H:MM:SS AM/PM]
  const messagePattern = /^\[?(\d{1,2}\/\d{1,2}\/\d{2,4}),?\s+(\d{1,2}:\d{2}(?::\d{2})?(?:\s*[AP]M)?)\]?\s*([^:]+):\s*(.*)$/;

  for (const line of lines) {
    const match = line.match(messagePattern);
    if (match) {
      const [, date, time, sender, content] = match;
      
      // Parse date and time
      const [day, month, year] = date.split('/').map(Number);
      const fullYear = year < 100 ? 2000 + year : year;
      
      let parsedTime = time;
      if (time.includes('AM') || time.includes('PM')) {
        // Handle 12-hour format
        parsedTime = time.replace(/\s*(AM|PM)/, '');
      }
      
      const [hours, minutes, seconds = 0] = parsedTime.split(':').map(Number);
      const timestamp = new Date(fullYear, month - 1, day, hours, minutes, seconds);

      // Extract emojis
      const emojiRegex = /[\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{1F1E0}-\u{1F1FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]/gu;
      const emojis = content.match(emojiRegex) || [];

      messages.push({
        timestamp,
        sender: sender.trim(),
        content: content.trim(),
        emojis
      });

      participants.add(sender.trim());
    }
  }

  // Sort messages by timestamp
  messages.sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());

  const participantArray = Array.from(participants);
  const analysis = analyzeChat(messages, participantArray);

  return {
    messages,
    participants: participantArray,
    totalMessages: messages.length,
    dateRange: {
      start: messages[0]?.timestamp || new Date(),
      end: messages[messages.length - 1]?.timestamp || new Date()
    },
    analysis
  };
}

function analyzeChat(messages: Message[], participants: string[]) {
  const user1 = participants[0];
  const user2 = participants[1] || participants[0];

  // Calculate reply times
  const replyTimes: number[] = [];
  const replyTimesByDate: Record<string, number[]> = {};
  
  for (let i = 1; i < messages.length; i++) {
    const current = messages[i];
    const previous = messages[i - 1];
    
    if (current.sender !== previous.sender) {
      const timeDiff = (current.timestamp.getTime() - previous.timestamp.getTime()) / (1000 * 60); // minutes
      if (timeDiff < 1440) { // Less than 24 hours
        replyTimes.push(timeDiff);
        
        const dateKey = current.timestamp.toDateString();
        if (!replyTimesByDate[dateKey]) {
          replyTimesByDate[dateKey] = [];
        }
        replyTimesByDate[dateKey].push(timeDiff);
      }
    }
  }

  const avgReplyTime = replyTimes.length > 0 
    ? replyTimes.reduce((a, b) => a + b, 0) / replyTimes.length 
    : 0;

  // Emoji analysis
  const emojiCount: Record<string, number> = {};
  messages.forEach(msg => {
    msg.emojis.forEach(emoji => {
      emojiCount[emoji] = (emojiCount[emoji] || 0) + 1;
    });
  });

  const topEmojis = Object.entries(emojiCount)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 10)
    .map(([emoji, count]) => ({
      emoji,
      count,
      meaning: EMOJI_MEANINGS[emoji] || 'Unknown'
    }));

  // Word frequency
  const wordCount: Record<string, number> = {};
  const stopWords = ['omitted', 'media', 'the', 'and', 'you', 'are', 'for', 'that', 'this', 'was', 'will', 'have', 'been', 'with'];
  messages.forEach(msg => {
    const words = msg.content.toLowerCase()
      .replace(/[^\w\s]/g, '')
      .split(/\s+/)
      .filter(word => word.length > 2 && !stopWords.includes(word));
    
    words.forEach(word => {
      wordCount[word] = (wordCount[word] || 0) + 1;
    });
  });

  const topWords = Object.entries(wordCount)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 20)
    .map(([word, count]) => ({ word, count }));

  // Message balance
  const user1Messages = messages.filter(m => m.sender === user1).length;
  const user2Messages = messages.filter(m => m.sender === user2).length;

  // Activity heatmap
  const activityByHour: Record<string, Record<number, number>> = {};
  messages.forEach(msg => {
    const day = msg.timestamp.toLocaleDateString('en-US', { weekday: 'short' });
    const hour = msg.timestamp.getHours();
    
    if (!activityByHour[day]) {
      activityByHour[day] = {};
    }
    activityByHour[day][hour] = (activityByHour[day][hour] || 0) + 1;
  });

  const activityHeatmap = [];
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  for (const day of days) {
    for (let hour = 0; hour < 24; hour++) {
      activityHeatmap.push({
        day,
        hour,
        count: activityByHour[day]?.[hour] || 0
      });
    }
  }

  // Reply times by date
  const replyTimesByDateArray = Object.entries(replyTimesByDate)
    .map(([date, times]) => ({
      date,
      avgTime: times.reduce((a, b) => a + b, 0) / times.length
    }))
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  // Calculate love score
  const loveScore = calculateLoveScore({
    avgReplyTime,
    emojiCount: topEmojis.length,
    messageBalance: user1Messages / (user1Messages + user2Messages),
    totalMessages: messages.length,
    heartEmojis: topEmojis.filter(e => ['❤️', '💕', '😍', '🥰', '😘', '💋'].includes(e.emoji)).length
  });

  return {
    loveScore,
    avgReplyTime,
    messageBalance: {
      user1: (user1Messages / messages.length) * 100,
      user2: (user2Messages / messages.length) * 100
    },
    topEmojis,
    topWords,
    replyTimes: replyTimesByDateArray,
    activityHeatmap
  };
}

function calculateLoveScore(factors: {
  avgReplyTime: number;
  emojiCount: number;
  messageBalance: number;
  totalMessages: number;
  heartEmojis: number;
}): number {
  let score = 50; // Base score

  // Quick reply bonus (faster replies = more love)
  if (factors.avgReplyTime < 5) score += 20; // Very quick
  else if (factors.avgReplyTime < 15) score += 15; // Quick
  else if (factors.avgReplyTime < 60) score += 10; // Moderate
  else if (factors.avgReplyTime > 240) score -= 15; // Slow

  // Emoji usage bonus
  score += Math.min(factors.emojiCount * 2, 15);

  // Heart emojis bonus
  score += Math.min(factors.heartEmojis * 3, 20);

  // Message balance (closer to 50-50 is better)
  const balanceScore = 15 - Math.abs(factors.messageBalance - 0.5) * 30;
  score += balanceScore;

  // Total messages bonus
  if (factors.totalMessages > 1000) score += 10;
  else if (factors.totalMessages > 500) score += 5;

  return Math.max(0, Math.min(100, Math.round(score)));
}