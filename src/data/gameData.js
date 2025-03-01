export const gameData = {
  title: "Silent Echoes",
  genre: "Turn-Based Psychological Horror",
  protagonist: {
    name: "Ethan Carter",
    age: 32,
    status: {
      sanity: 100,
      health: 100,
      inventory: []
    }
  },
  chapters: [
    {
      id: "chapter1",
      title: "Kabut yang Menghantui",
      description: "Ethan terbangun di sebuah jalanan sepi, dikelilingi kabut tebal tanpa ingatan bagaimana ia sampai di sana.",
      initialScene: {
        id: "awakening",
        narration: "Kamu  membuka mata dan menemukan dirimu di sebuah jalanan kosong. Kabut tebal menyelimuti sekeliling. Tidak ada suara, tidak ada tanda kehidupan.",
        dialog: "Ethan: \"Apa tempat ini...? Kenapa aku ada di sini?\"",
        choices: [
          {
            id: "check_surroundings",
            text: "Periksa Sekitar",
            consequence: {
              type: "discovery",
              description: "Kamu menemukan senter dan catatan usang.",
              itemsGained: ["senter", "catatan_misterius"],
              nextSceneId: "found_items"
            }
          }
        ]
      },
      scenes: [
        {
          id: "found_items",
          narration: "Kamu menemukan senter yang masih berfungsi dan secarik kertas usang. Catatan itu bertuliskan \"Jangan Percaya Mereka\" dengan tinta merah.",
          dialog: "Bisikan tak dikenal: \"Kamu tidak sendiri...\"",
          choices: [
            {
              id: "enter_house",
              text: "Masuk Rumah Terdekat",
              consequence: {
                type: "exploration",
                description: "Kamu memasuki rumah terdekat yang pintunya sedikit terbuka.",
                itemsGained: ["kunci", "radio_rusak"],
                nextSceneId: "inside_house"
              }
            },
            {
              id: "explore_streets",
              text: "Jelajahi Jalanan",
              consequence: {
                type: "encounter",
                description: "Kamu melihat bayangan samar bergerak di kejauhan. Saat Kamu mendekat, sosok itu berbalik...",
                monsterEncounter: "the_hollow",
                nextSceneId: "monster_encounter"
              }
            }
          ]
        },
        {
          id: "inside_house",
          narration: "Rumah itu berdebu dan ditinggalkan. Kamu menemukan kunci aneh dan radio rusak di atas meja.",
          dialog: "Ethan: \"Sepertinya tempat ini sudah lama ditinggalkan...\"",
          choices: [
            {
              id: "check_radio",
              text: "Periksa Radio",
              consequence: {
                type: "clue",
                description: "Radio itu mengeluarkan suara statis, namun di antara suara gangguan itu Kamu mendengar kata 'rumah sakit'.",
                nextSceneId: "hear_hospital"
              }
            },
            {
              id: "leave_house",
              text: "Keluar dari Rumah",
              consequence: {
                type: "progression",
                description: "Kamu memutuskan untuk keluar dan melanjutkan pencarianmu.",
                nextSceneId: "monster_encounter"
              }
            }
          ]
        },
        {
          id: "hear_hospital",
          narration: "Di antara suara statis dari radio, Kamu mendengar jelas kata 'rumah sakit' disebutkan berulang kali.",
          dialog: "Suara Radio: \"...kembali ke rumah sakit... dia menunggu di rumah sakit...\"",
          choices: [
            {
              id: "go_to_hospital",
              text: "Cari Rumah Sakit",
              consequence: {
                type: "chapter_progression",
                description: "Kamu memutuskan untuk mencari rumah sakit yang disebutkan.",
                sanityChange: -5,
                nextChapterId: "chapter2",
                nextSceneId: "hospital_entrance"
              }
            }
          ]
        },
        {
          id: "monster_encounter",
          narration: "Di hadapanmu berdiri sosok yang mengerikan—manusia tanpa ekspresi dengan lubang kosong di tempat matanya seharusnya berada.",
          dialog: "Ethan: \"Apa itu... makhluk apa itu?!\"",
          monsterData: {
            id: "the_hollow",
            name: "The Hollow",
            description: "Makhluk dengan wajah manusia tanpa ekspresi. Lubang hitam menggantikan mata dan mulutnya.",
            health: 50,
            attackPower: 15
          },
          choices: [
            {
              id: "fight_monster",
              text: "Serang",
              consequence: {
                type: "battle",
                description: "Kamu menyerang The Hollow dengan putus asa.",
                battleOutcome: {
                  victory: {
                    description: "Setelah perjuangan sengit, makhluk itu akhirnya jatuh dan lenyap menjadi abu hitam.",
                    sanityChange: -10,
                    healthChange: -20,
                    nextSceneId: "post_battle"
                  },
                  defeat: {
                    description: "The Hollow terlalu kuat. Kamu jatuh dalam kegelapan...",
                    respawnSceneId: "chapter1_restart",
                    sanityChange: -15
                  }
                }
              }
            },
            {
              id: "flee_monster",
              text: "Kabur",
              consequence: {
                type: "escape",
                description: "Kamu berbalik dan lari sekuat tenaga, berhasil menghindari makhluk itu.",
                sanityChange: -5,
                itemsLost: ["kunci"],
                nextSceneId: "escaped_hollow"
              }
            }
          ]
        },
        {
          id: "post_battle",
          narration: "Nafasmu masih terengah-engah. Dari abu The Hollow, Kamu menemukan sebuah peta usang yang menunjukkan lokasi rumah sakit kota.",
          dialog: "Ethan: \"Rumah sakit... Mungkin di sana aku bisa menemukan jawaban.\"",
          choices: [
            {
              id: "go_to_hospital",
              text: "Menuju Rumah Sakit",
              consequence: {
                type: "chapter_progression",
                description: "Kamu memutuskan untuk mencari rumah sakit yang ditunjukkan pada peta.",
                nextChapterId: "chapter2",
                nextSceneId: "hospital_entrance"
              }
            }
          ]
        },
        {
          id: "escaped_hollow",
          narration: "Kamu berlari hingga nafasmu habis. Saat menoleh ke belakang, sosok itu telah menghilang. Di kejauhan, Kamu melihat bangunan besar yang tampak seperti rumah sakit.",
          dialog: "Ethan: \"Tempat itu... mungkin aku bisa menemukan jawaban di sana.\"",
          choices: [
            {
              id: "go_to_hospital",
              text: "Menuju Rumah Sakit",
              consequence: {
                type: "chapter_progression",
                description: "Kamu memutuskan untuk menuju rumah sakit yang terlihat di kejauhan.",
                nextChapterId: "chapter2",
                nextSceneId: "hospital_entrance"
              }
            }
          ]
        },
        {
          id: "chapter1_restart",
          narration: "Kamu terbangun kembali di jalanan sepi. Kabut tampak lebih tebal dari sebelumnya, dan perasaan diawasi semakin kuat.",
          dialog: "Ethan: \"Apa yang terjadi? Aku masih hidup?\"",
          choices: [
            {
              id: "restart_journey",
              text: "Mulai Lagi",
              consequence: {
                type: "restart",
                description: "Kamu bangkit dan memutuskan untuk mencoba lagi.",
                sanityChange: -5,
                nextSceneId: "awakening"
              }
            }
          ]
        }
      ]
    },
    {
      id: "chapter2",
      title: "Rumah Sakit Kenangan",
      initialScene: {
        id: "hospital_entrance",
        narration: "Kamu tiba di depan rumah sakit tua yang tampak ditinggalkan. Pintu depannya sedikit terbuka, seolah mengundangmu masuk.",
        dialog: "Ethan: \"Tempat ini... terasa familiar.\"",
        choices: [
          {
            id: "enter_hospital",
            text: "Masuk ke Dalam",
            consequence: {
              type: "exploration",
              description: "Kamu melangkah masuk ke dalam rumah sakit yang gelap. Suara tangisan dan rintihan samar terdengar dari jauh.",
              sanityChange: -5,
              nextSceneId: "hospital_lobby"
            }
          }
        ]
      },
      scenes: [
        {
          id: "hospital_lobby",
          narration: "Lobi rumah sakit dipenuhi kursi-kursi berdebu dan poster kesehatan usang. Suara tangisan dan rintihan samar-samar terdengar dari koridor sebelah kanan.",
          dialog: "Ethan: \"Siapa di sana? Ada orang?\"",
          choices: [
            {
              id: "check_reception",
              text: "Periksa Meja Resepsi",
              consequence: {
                type: "discovery",
                description: "Di meja resepsi Kamu menemukan buku register pasien. Buku itu terbuka pada halaman dengan nama '.06.C.'",
                nextSceneId: "medical_records_puzzle"
              }
            },
            {
              id: "follow_sounds",
              text: "Ikuti Suara Rintihan",
              consequence: {
                type: "encounter",
                description: "Kamu mengikuti suara rintihan itu dan sampai di koridor gelap.",
                nextSceneId: "dark_corridor"
              }
            }
          ]
        },
        {
          id: "medical_records_puzzle",
          narration: "Catatan medis di buku register tampak robek dan berantakan. Kamu merasa perlu menyusunnya kembali untuk memahami isinya.",
          puzzleData: {
            id: "medical_records",
            description: "Susun kembali potongan-potongan rekaman medis untuk membaca informasi lengkapnya.",
            solution: ".06.C., 32, laki-laki. Pasien mengalami psikosis berat. Menunjukkan tanda-tanda disosiatif dan halusinasi. Berbahaya bagi diri sendiri dan orang lain."
          },
          choices: [
            {
              id: "solve_puzzle",
              text: "Pecahkan Teka-teki",
              consequence: {
                type: "puzzle_solved",
                description: "Kamu berhasil menyusun potongan-potongan rekaman medis.",
                sanityChange: -10,
                nextSceneId: "records_revelation"
              }
            },
            {
              id: "abandon_puzzle",
              text: "Tinggalkan Puzzle",
              consequence: {
                type: "progression",
                description: "Kamu memutuskan untuk meninggalkan puzzle dan melanjutkan pencarianmu.",
                nextSceneId: "dark_corridor"
              }
            }
          ]
        },
        {
          id: "records_revelation",
          narration: "Kamu membaca rekaman medis yang telah Kamu susun: \".06.C., 32, laki-laki. Pasien mengalami psikosis berat. Menunjukkan tanda-tanda disosiatif dan halusinasi. Berbahaya bagi diri sendiri dan orang lain.\"",
          dialog: "Ethan: \"Siapa '.06.C.'? Apakah itu aku...?\"",
          choices: [
            {
              id: "continue_exploration",
              text: "Lanjutkan Pencarian",
              consequence: {
                type: "progression",
                description: "Dengan pikiran berkecamuk, Kamu memutuskan untuk melanjutkan pencarianmu.",
                sanityChange: -5,
                nextSceneId: "dark_corridor"
              }
            }
          ]
        },
        {
          id: "dark_corridor",
          narration: "Koridor panjang dan gelap membentang di hadapanmu. Suara langkah kaki terdengar mendekat dari kegelapan.",
          dialog: "Suara wanita misterius: \"Kamu telah melupakan segalanya, kan? Tapi dosa tidak bisa dihapus...\"",
          choices: [
            {
              id: "use_flashlight",
              text: "Gunakan Senter",
              requiresItem: "senter",
              consequence: {
                type: "discovery",
                description: "Cahaya sentermu menyinari sosok wanita berkabut di ujung koridor.",
                nextSceneId: "wraith_appears"
              }
            },
            {
              id: "proceed_darkness",
              text: "Terus Maju dalam Kegelapan",
              consequence: {
                type: "danger",
                description: "Kamu terus melangkah dalam kegelapan, tanpa menyadari bahaya yang menanti.",
                healthChange: -15,
                nextSceneId: "wraith_appears"
              }
            }
          ]
        },
        {
          id: "wraith_appears",
          narration: "Sosok wanita itu menghilang, digantikan oleh makhluk mengerikan yang melayang di udara dengan jubah compang-camping.",
          dialog: "Ethan: \"Apa itu?!\"",
          monsterData: {
            id: "the_wraith",
            name: "The Wraith",
            description: "Sosok melayang dengan jubah compang-camping dan wajah terdistorsi.",
            health: 70,
            attackPower: 20
          },
          choices: [
            {
              id: "hide_in_closet",
              text: "Bersembunyi di Lemari",
              consequence: {
                type: "escape",
                description: "Kamu bergegas masuk ke dalam lemari terdekat. The Wraith melayang melewatimu tanpa mengetahui keberadaanmu.",
                nextSceneId: "after_wraith"
              }
            },
            {
              id: "run_to_operating_room",
              text: "Lari ke Ruang Operasi",
              consequence: {
                type: "puzzle",
                description: "Kamu berlari ke ruang operasi terdekat dan mengunci pintunya, namun pintu itu segera digedor kuat.",
                nextSceneId: "operating_room_puzzle"
              }
            }
          ]
        },
        {
          id: "operating_room_puzzle",
          narration: "Pintu ruang operasi mulai retak karena gedoran The Wraith. Kamu melihat panel aneh di dinding yang mungkin bisa mengaktifkan mekanisme penguncian tambahan.",
          puzzleData: {
            id: "door_mechanism",
            description: "Aktifkan mekanisme penguncian dengan menekan tombol dalam urutan yang benar.",
            solution: "Merah, Biru, Hijau, Kuning"
          },
          choices: [
            {
              id: "solve_door_puzzle",
              text: "Pecahkan Teka-teki Pintu",
              consequence: {
                type: "puzzle_solved",
                description: "Kamu berhasil mengaktifkan mekanisme penguncian tambahan! The Wraith menjerit frustrasi dan pergi.",
                nextSceneId: "operating_room_safe"
              }
            },
            {
              id: "fail_door_puzzle",
              text: "Gagal Memecahkan Teka-teki",
              isDefault: true,
              consequence: {
                type: "danger",
                description: "Kamu tidak berhasil mengaktifkan mekanisme penguncian. Pintu hancur dan The Wraith menyerangmu!",
                healthChange: -30,
                sanityChange: -15,
                nextSceneId: "wraith_attack"
              }
            }
          ]
        },
        {
          id: "wraith_attack",
          narration: "The Wraith melesat masuk dan menyerangmu dengan cakarnya yang tajam. Kamu tidak punya pilihan selain melawan.",
          choices: [
            {
              id: "fight_wraith",
              text: "Lawan The Wraith",
              consequence: {
                type: "battle",
                description: "Kamu melawan The Wraith dengan putus asa.",
                battleOutcome: {
                  victory: {
                    description: "Setelah pertarungan menegangkan, The Wraith akhirnya lenyap menjadi kabut tipis.",
                    healthChange: -25,
                    sanityChange: -15,
                    nextSceneId: "after_wraith"
                  },
                  defeat: {
                    description: "The Wraith terlalu kuat. Kamu tidak bisa melawannya...",
                    respawnSceneId: "hospital_entrance",
                    sanityChange: -20
                  }
                }
              }
            }
          ]
        },
        {
          id: "operating_room_safe",
          narration: "Kamu berhasil mengunci pintu. Ruang operasi itu berisi berbagai peralatan medis usang dan sebuah foto lama di atas meja.",
          dialog: "Ethan: \"Foto ini... tampaknya familiar.\"",
          choices: [
            {
              id: "examine_photo",
              text: "Periksa Foto",
              consequence: {
                type: "clue",
                description: "Foto itu menunjukkan sebuah pabrik tua di tepi kota. Di belakangnya tertulis 'Tempat Segalanya Bermula'.",
                nextSceneId: "find_factory_clue"
              }
            },
            {
              id: "leave_operating_room",
              text: "Tinggalkan Ruangan",
              consequence: {
                type: "progression",
                description: "Kamu memutuskan untuk melanjutkan pencarianmu.",
                nextSceneId: "after_wraith"
              }
            }
          ]
        },
        {
          id: "after_wraith",
          narration: "Dengan The Wraith tidak lagi mengancam, Kamu meneruskan pencarianmu di rumah sakit. Di sebuah meja, Kamu menemukan selembar kertas dengan tulisan tangan yang kacau.",
          dialog: "Tulisan di kertas: \"Pabrik... kesalahan terbesar... mereka semua mati... salahku...\"",
          choices: [
            {
              id: "investigate_factory",
              text: "Cari Pabrik yang Dimaksud",
              consequence: {
                type: "chapter_progression",
                description: "Kamu memutuskan untuk mencari pabrik yang disebutkan dalam petunjuk.",
                nextChapterId: "chapter3",
                nextSceneId: "factory_exterior"
              }
            }
          ]
        },
        {
          id: "find_factory_clue",
          narration: "Kamu mengamati foto itu dengan seksama. Pabrik tua dengan cerobong asap tinggi. Logo 'Carter Industries' terlihat jelas di gerbangnya.",
          dialog: "Ethan: \"Carter... nama keluargaku. Apa hubunganku dengan pabrik ini?\"",
          choices: [
            {
              id: "go_to_factory",
              text: "Pergi ke Pabrik",
              consequence: {
                type: "chapter_progression",
                description: "Kamu memutuskan untuk mencari pabrik yang terlihat di foto.",
                sanityChange: -5,
                nextChapterId: "chapter3",
                nextSceneId: "factory_exterior"
              }
            }
          ]
        }
      ]
    },
    {
      id: "chapter3",
      title: "Pabrik Ingatan",
      initialScene: {
        id: "factory_exterior",
        narration: "Kamu tiba di luar pabrik tua yang tampak mengerikan. Gerbang besarnya berkarat dan setengah terbuka. Coretan darah terlihat di tembok luar.",
        dialog: "Ethan: \"Pabrik Carter Industries... milik keluargaku?\"",
        choices: [
          {
            id: "enter_factory",
            text: "Masuk ke Pabrik",
            consequence: {
              type: "exploration",
              description: "Kamu mendorong gerbang berkarat dan melangkah masuk ke dalam pabrik yang gelap.",
              sanityChange: -5,
              nextSceneId: "factory_main_hall"
            }
          }
        ]
      },
      scenes: [
        {
          id: "factory_main_hall",
          narration: "Aula utama pabrik dipenuhi mesin-mesin berkarat dan bangku kerja yang hancur. Dinding dipenuhi coretan darah dan pesan-pesan mengerikan.",
          dialog: "Ethan: \"Apa yang terjadi di tempat ini...?\"",
          choices: [
            {
              id: "read_wall",
              text: "Baca Tulisan di Dinding",
              consequence: {
                type: "clue",
                description: "Tulisan di dinding tampak ditulis dengan darah: 'Kecelakaan bukan kecelakaan. Dia tahu. Dia yang menyebabkan.'",
                sanityChange: -10,
                nextSceneId: "wall_messages"
              }
            },
            {
              id: "check_machines",
              text: "Periksa Mesin",
              consequence: {
                type: "discovery",
                description: "Kamu memeriksa mesin-mesin tua. Di antara puing-puing, Kamu menemukan jam saku antik.",
                itemsGained: ["jam_saku"],
                nextSceneId: "found_pocket_watch"
              }
            }
          ]
        },
        {
          id: "wall_messages",
          narration: "Semakin Kamu membaca pesan-pesan di dinding, semakin Kamu merasa tidak nyaman. Mereka semua menuduh seseorang bernama 'Carter' bertanggung jawab atas suatu tragedi.",
          dialog: "Ethan: \"Apakah yang dimaksud adalah ayahku... atau aku?\"",
          choices: [
            {
              id: "deeper_into_factory",
              text: "Masuk Lebih Dalam",
              consequence: {
                type: "progression",
                description: "Kamu memutuskan untuk menjelajah lebih dalam ke pabrik.",
                nextSceneId: "factory_inner_area"
              }
            }
          ]
        },
        {
          id: "found_pocket_watch",
          narration: "Jam saku emas itu masih berfungsi meskipun tampak usang. Anehnya, jarum jamnya bergerak mundur. Ada ukiran nama 'Ethan Carter' di bagian belakangnya.",
          dialog: "Ethan: \"Ini milikku... tapi aku tidak ingat pernah memilikinya.\"",
          choices: [
            {
              id: "use_pocket_watch",
              text: "Coba Gunakan Jam Saku",
              consequence: {
                type: "special_ability",
                description: "Saat Kamu memutar pemutar jam, dunia di sekitarmu seolah bergetar. Beberapa detik yang lalu tampak terulang kembali.",
                nextSceneId: "watch_revelation"
              }
            },
            {
              id: "keep_exploring",
              text: "Simpan dan Lanjutkan Eksplorasi",
              consequence: {
                type: "progression",
                description: "Kamu menyimpan jam tersebut dan melanjutkan eksplorasimu.",
                nextSceneId: "factory_inner_area"
              }
            }
          ]
        },
        {
          id: "watch_revelation",
          narration: "Dunia di sekitarmu berputar dan Kamu melihat kilasan masa lalu—pekerja-pekerja di pabrik, mesin-mesin beroperasi, dan kemudian... ledakan besar.",
          dialog: "Suara dari masa lalu: \"Tuan Carter! Katup tekanan rusak! Kita harus evakuasi!\"",
          choices: [
            {
              id: "stop_vision",
              text: "Hentikan Visi",
              consequence: {
                type: "vision_end",
                description: "Kamu menutup jam saku dan visi itu berhenti. Kepalamu berdenyut sakit.",
                sanityChange: -15,
                nextSceneId: "factory_inner_area"
              }
            }
          ]
        },
        {
          id: "factory_inner_area",
          narration: "Bagian dalam pabrik lebih mengerikan. Bercak darah kering terlihat di lantai. Ada ruangan dengan pintu baja di ujung lorong.",
          dialog: "Ethan: \"Apakah aku pernah ke tempat ini...?\"",
          choices: [
            {
              id: "follow_blood",
              text: "Ikuti Jejak Darah",
              consequence: {
                type: "exploration",
                description: "Kamu mengikuti jejak darah yang mengarah ke sebuah ruangan kecil.",
                nextSceneId: "foreman_office"
              }
            },
            {
              id: "check_steel_door",
              text: "Periksa Pintu Baja",
              consequence: {
                type: "puzzle",
                description: "Pintu baja itu terkunci rapat. Ada panel angka di sampingnya.",
                nextSceneId: "steel_door_puzzle"
              }
            }
          ]
        },
        {
          id: "foreman_office",
          narration: "Ruangan itu tampaknya adalah kantor mandor. Ada meja kerja berantakan dengan dokumen-dokumen yang berserakan.",
          dialog: "Ethan: \"Mungkin ada petunjuk di sini...\"",
          choices: [
            {
              id: "search_documents",
              text: "Periksa Dokumen",
              consequence: {
                type: "discovery",
                description: "Kamu menemukan laporan kecelakaan: 'Ledakan terjadi pukul 15:45. 23 pekerja tewas. Penyebab: kelalaian pengawasan oleh E. Carter.'",
                sanityChange: -15,
                nextSceneId: "accident_report"
              }
            },
            {
              id: "check_desk_drawer",
              text: "Buka Laci Meja",
              consequence: {
                type: "discovery",
                description: "Di dalam laci, Kamu menemukan pisau karat dan kunci dengan label 'Ruang Mesin'.",
                itemsGained: ["pisau_karat", "kunci_ruang_mesin"],
                nextSceneId: "found_rusty_knife"
              }
            }
          ]
        },
        {
          id: "accident_report",
          narration: "Kamu membaca laporan itu berulang kali, mencoba memahami apa yang terjadi. Tiba-tiba, Kamu mendengar suara wanita yang familiar.",
          dialog: "Bayangan Ibu Ethan: \"Kamu tak bisa lari dari yang telah Kamu lakukan...\"",
          choices: [
            {
              id: "confront_vision",
              text: "Hadapi Bayangan",
              consequence: {
                type: "psychological",
                description: "Kamu berbalik dan melihat bayangan ibumu berdiri di ambang pintu, wajahnya sedih dan mengecam.",
                sanityChange: -20,
                nextSceneId: "mother_confrontation"
              }
            },
            {
              id: "run_from_vision",
              text: "Lari dari Bayangan",
              consequence: {
                type: "escape",
                description: "Kamu berlari keluar dari ruangan, menolak menghadapi bayangan itu.",
                sanityChange: -10,
                nextSceneId: "encounter_maw"
              }
            }
          ]
        },
        {
          id: "mother_confrontation",
          narration: "Bayangan ibumu menatapmu dengan mata penuh kesedihan dan kekecewaan.",
          dialog: "Bayangan Ibu: \"Kamu membiarkan mereka mati, Ethan. Sama seperti Kamu membiarkan kami mati.\"",
          choices: [
            {
              id: "deny_accusation",
              text: "Sangkal Tuduhan",
              consequence: {
                type: "psychological",
                description: "\"Aku tidak membunuh siapapun!\" teriakmu. Bayangan itu tertawa sedih sebelum lenyap.",
                sanityChange: -15,
                truthMeters: { denial: +20 },
                nextSceneId: "after_mother_vision"
              }
            },
            {
              id: "ask_forgiveness",
              text: "Minta Maaf",
              consequence: {
                type: "psychological",
                description: "\"Maafkan aku...\" bisikmu. Bayangan ibumu menangis dan perlahan menghilang.",
                sanityChange: -10,
                truthMeters: { acceptance: +20 },
                nextSceneId: "after_mother_vision"
              }
            }
          ]
        },
        {
          id: "found_rusty_knife",
          narration: "Pisau itu berkarat tapi masih tajam. Kunci ruang mesin mungkin bisa membuka pintu baja yang Kamu lihat sebelumnya.",
          dialog: "Ethan: \"Ini bisa berguna untuk melindungi diri.\"",

          choices: [
            {
              id: "go_to_steel_door",
              text: "Pergi ke Pintu Baja",
              consequence: {
                type: "progression",
                description: "Dengan kunci di tangan, Kamu memutuskan untuk mencoba membuka pintu baja.",
                nextSceneId: "steel_door_unlock"
              }
            }
          ]
        },
        {
          id: "after_mother_vision",
          narration: "Setelah bayangan ibumu menghilang, Kamu merasa lelah dan tertekan. Suara-suara di kepalamu semakin keras.",
          dialog: "Ethan: \"Aku harus tahu apa yang sebenarnya terjadi...\"",
          choices: [
            {
              id: "continue_investigation",
              text: "Lanjutkan Penyelidikan",
              consequence: {
                type: "progression",
                description: "Kamu menarik nafas dalam dan memutuskan untuk terus mencari kebenaran.",
                nextSceneId: "encounter_maw"
              }
            }
          ]
        },
        {
          id: "steel_door_puzzle",
          narration: "Panel angka di pintu baja memerlukan kode 4 digit. Ada petunjuk samar di sampingnya: 'Tanggal kematian mereka'.",
          puzzleData: {
            id: "door_code",
            description: "Masukkan kode 4 digit yang benar untuk membuka pintu baja.",
            solution: "1545",
            hint: "Lihat laporan kecelakaan"
          },
          choices: [
            {
              id: "solve_door_code",
              text: "Masukkan Kode",
              requiresClue: "accident_report",
              consequence: {
                type: "puzzle_solved",
                description: "Kamu memasukkan angka 1545—waktu ledakan yang tertulis di laporan. Pintu terbuka!",
                nextSceneId: "machine_room"
              }
            },
            {
              id: "look_for_clue",
              text: "Cari Petunjuk Lain",
              consequence: {
                type: "exploration",
                description: "Kamu memutuskan untuk mencari petunjuk lain terlebih dahulu.",
                nextSceneId: "foreman_office"
              }
            },
            {
              id: "use_key",
              text: "Gunakan Kunci Ruang Mesin",
              requiresItem: "kunci_ruang_mesin",
              consequence: {
                type: "success",
                description: "Kamu mencoba kunci ruang mesin dan pintu terbuka!",
                nextSceneId: "machine_room"
              }
            }
          ]
        },
        {
          id: "steel_door_unlock",
          narration: "Kamu mencoba kunci ruang mesin pada pintu baja. Dengan suara berderit, pintu itu terbuka.",
          dialog: "Ethan: \"Akhirnya...\"",
          choices: [
            {
              id: "enter_machine_room",
              text: "Masuk ke Ruang Mesin",
              consequence: {
                type: "progression",
                description: "Kamu melangkah masuk ke dalam ruang mesin yang gelap gulita.",
                nextSceneId: "machine_room"
              }
            }
          ]
        },
        {
          id: "encounter_maw",
          narration: "Saat Kamu bergerak melalui lorong gelap, suara aneh terdengar—seperti bisikan yang berubah menjadi jeritan tertahan.",
          dialog: "Ethan: \"Suara apa itu?\"",
          choices: [
            {
              id: "investigate_sound",
              text: "Selidiki Suara",
              consequence: {
                type: "encounter",
                description: "Kamu bergerak ke arah suara itu dan menemukan sosok mengerikan—makhluk dengan mulut besar yang terbuka di seluruh tubuhnya.",
                nextSceneId: "maw_appearance"
              }
            },
            {
              id: "avoid_sound",
              text: "Hindari Suara",
              consequence: {
                type: "escape",
                description: "Kamu memutuskan untuk menghindari suara itu dan mencari jalan lain.",
                nextSceneId: "alternative_route"
              }
            }
          ]
        },
        {
          id: "maw_appearance",
          narration: "Di hadapanmu muncul makhluk mengerikan—The Maw. Tubuhnya dipenuhi mulut yang terbuka dan menutup, masing-masing mengeluarkan suara berbeda.",
          dialog: "Ethan: \"Oh Tuhan...\"",
          monsterData: {
            id: "the_maw",
            name: "The Maw",
            description: "Makhluk dengan tubuh penuh mulut yang menghisap suara dan mengubahnya menjadi jeritan.",
            health: 85,
            attackPower: 25
          },
          choices: [
            {
              id: "attack_with_knife",
              text: "Serang dengan Pisau Karat",
              requiresItem: "pisau_karat",
              consequence: {
                type: "battle",
                description: "Kamu menyerang The Maw dengan pisau karatmu.",
                battleOutcome: {
                  victory: {
                    description: "Kamu berhasil melukai The Maw cukup parah hingga makhluk itu mundur dengan mengeluarkan jeritan mengerikan.",
                    healthChange: -20,
                    sanityChange: -15,
                    nextSceneId: "after_maw_battle"
                  },
                  defeat: {
                    description: "The Maw terlalu kuat. Jeritan-jeritan dari mulutnya membuatmu tak sadarkan diri...",
                    respawnSceneId: "factory_main_hall",
                    sanityChange: -25
                  }
                }
              }
            },
            {
              id: "flee_from_maw",
              text: "Kabur",
              consequence: {
                type: "escape",
                description: "Kamu berbalik dan berlari sekuat tenaga, mencari jalan keluar dari situasi mengerikan ini.",
                nextSceneId: "alternative_route"
              }
            }
          ]
        },
        {
          id: "alternative_route",
          narration: "Kamu menemukan jalan memutar melalui ventilasi pabrik. Melalui celah-celah kecil, Kamu bisa melihat ruang mesin di bawah.",
          dialog: "Ethan: \"Harus ada cara masuk ke sana...\"",
          choices: [
            {
              id: "crawl_through_vents",
              text: "Merangkak Melalui Ventilasi",
              consequence: {
                type: "exploration",
                description: "Kamu merangkak melalui saluran ventilasi yang sempit, melewati sarang tikus dan laba-laba.",
                nextSceneId: "vent_to_machine_room"
              }
            }
          ]
        },
        {
          id: "after_maw_battle",
          narration: "Setelah The Maw mundur, Kamu menemukan jalan menuju ruang mesin utama. Tanganmu gemetar setelah pertarungan mengerikan itu.",
          dialog: "Ethan: \"Aku harus segera menemukan jawabannya dan keluar dari tempat ini.\"",
          choices: [
            {
              id: "enter_main_machine_room",
              text: "Masuk ke Ruang Mesin Utama",
              consequence: {
                type: "progression",
                description: "Kamu melangkah memasuki ruang mesin utama yang luas.",
                nextSceneId: "machine_room"
              }
            }
          ]
        },
        {
          id: "vent_to_machine_room",
          narration: "Setelah merangkak beberapa menit, Kamu menemukan jalan keluar ventilasi tepat di atas ruang mesin utama.",
          dialog: "Ethan: \"Akhirnya...\"",
          choices: [
            {
              id: "drop_to_machine_room",
              text: "Turun ke Ruang Mesin",
              consequence: {
                type: "progression",
                description: "Kamu menendang kisi ventilasi dan melompat turun ke ruang mesin utama.",
                healthChange: -5,
                nextSceneId: "machine_room"
              }
            }
          ]
        },
        {
          id: "machine_room",
          narration: "Ruang mesin utama dipenuhi peralatan raksasa dan panel kontrol. Di tengah ruangan terdapat katup besar berlabel 'Tekanan Utama' yang rusak parah.",
          dialog: "Ethan: \"Inilah tempat terjadinya ledakan...\"",
          choices: [
            {
              id: "examine_control_panel",
              text: "Periksa Panel Kontrol",
              consequence: {
                type: "discovery",
                description: "Di panel kontrol Kamu menemukan buku log dengan catatan terakhir: 'Peringatan diabaikan. .06.C. menolak mengevakuasi demi mencapai target produksi.'",
                sanityChange: -15,
                nextSceneId: "control_panel_revelation"
              }
            },
            {
              id: "use_pocket_watch_here",
              text: "Gunakan Jam Saku",
              requiresItem: "jam_saku",
              consequence: {
                type: "time_manipulation",
                description: "Kamu menggunakan jam saku untuk melihat masa lalu ruangan ini.",
                nextSceneId: "machine_room_past"
              }
            }
          ]
        },
        {
          id: "control_panel_revelation",
          narration: "Catatan itu menusuk kesadaranmu. Tiba-tiba kepalamu berdenyut hebat, dan kilasan memori menyerangmu.",
          dialog: "Ethan: \"Aku... aku yang melakukan ini?\"",
          choices: [
            {
              id: "accept_responsibility",
              text: "Terima Tanggung Jawab",
              consequence: {
                type: "psychological",
                description: "Kamu mulai menerima kemungkinan bahwa Kamulah yang bertanggung jawab atas tragedi ini.",
                sanityChange: -10,
                truthMeters: { acceptance: +25 },
                nextSceneId: "begin_to_remember"
              }
            },
            {
              id: "reject_responsibility",
              text: "Tolak Tanggung Jawab",
              consequence: {
                type: "psychological",
                description: "Kamu menolak percaya bahwa Kamu bertanggung jawab. Pasti ada penjelasan lain.",
                sanityChange: -15,
                truthMeters: { denial: +25 },
                nextSceneId: "continue_denial"
              }
            }
          ]
        },
        {
          id: "machine_room_past",
          narration: "Dunia berputar, dan Kamu melihat ruangan ini di masa lalu. Pekerja bergegas mencoba memperbaiki katup yang bocor, sementara seorang pria dengan pakaian rapi—dirimu—berdiri dan membentak.",
          dialog: "Ethan masa lalu: \"Abaikan saja! Kita harus memenuhi kuota! Keluarga Carter tidak pernah gagal!\"",
          choices: [
            {
              id: "watch_more",
              text: "Lanjutkan Menyaksikan",
              consequence: {
                type: "revelation",
                description: "Kamu menyaksikan saat ledakan terjadi. Pria itu—dirimu—adalah satu-satunya yang berhasil keluar tepat waktu.",
                sanityChange: -25,
                truthMeters: { acceptance: +30 },
                nextSceneId: "explosion_memory"
              }
            },
            {
              id: "stop_watching",
              text: "Hentikan Visi",
              consequence: {
                type: "escape",
                description: "Kamu menutup jam saku, menolak melihat apa yang terjadi selanjutnya.",
                sanityChange: -15,
                truthMeters: { denial: +20 },
                nextSceneId: "continue_denial"
              }
            }
          ]
        },
        {
          id: "begin_to_remember",
          narration: "Memori mulai kembali. Kamu ingat bagaimana Kamu mengabaikan peringatan para teknisi demi keuntungan. Kamu ingat ledakan itu.",
          dialog: "Ethan: \"Apa yang telah aku lakukan...\"",
          choices: [
            {
              id: "leave_factory",
              text: "Tinggalkan Pabrik",
              consequence: {
                type: "chapter_progression",
                description: "Dengan beban berat di pundak, Kamu memutuskan untuk meninggalkan pabrik dan mencari tahu lebih banyak tentang masa lalumu.",
                nextChapterId: "chapter4",
                nextSceneId: "carter_house_exterior"
              }
            }
          ]
        },
        {
          id: "explosion_memory",
          narration: "Kamu menyaksikan ledakan dahsyat yang menghancurkan ruangan dan membunuh para pekerja. Dirimu di masa lalu berhasil keluar tepat waktu, meninggalkan yang lain terjebak.",
          dialog: "Ethan: \"Tidak... aku membiarkan mereka mati...\"",
          choices: [
            {
              id: "confront_truth",
              text: "Hadapi Kebenaran",
              consequence: {
                type: "chapter_progression",
                description: "Dengan beban berat di pundak, Kamu memutuskan untuk meninggalkan pabrik dan menghadapi lebih banyak kebenaran tentang masa lalumu.",
                nextChapterId: "chapter4",
                nextSceneId: "carter_house_exterior"
              }
            }
          ]
        },
        {
          id: "continue_denial",
          narration: "Kamu menolak mempercayai apa yang Kamu lihat. Pasti ada kesalahan, pikirmu. Kamu bukan orang seperti itu.",
          dialog: "Ethan: \"Itu bukan aku. Tidak mungkin aku melakukan hal seperti itu.\"",
          choices: [
            {
              id: "leave_factory_in_denial",
              text: "Tinggalkan Pabrik",
              consequence: {
                type: "chapter_progression",
                description: "Kamu memutuskan untuk meninggalkan pabrik, masih tidak mempercayai apa yang Kamu temukan di sana.",
                nextChapterId: "chapter4",
                nextSceneId: "carter_house_exterior"
              }
            }
          ]
        }
      ]
    },
    {
      id: "chapter4",
      title: "Rumah Keluarga Carter",
      initialScene: {
        id: "carter_house_exterior",
        narration: "Kamu tiba di depan rumah besar bergaya Victoria yang tampak hancur dan tidak terawat. Papan nama 'Carter' yang setengah rusak tergantung di pagar depan.",
        dialog: "Ethan: \"Rumahku... tempat aku dibesarkan.\"",
        choices: [
          {
            id: "enter_house",
            text: "Masuk ke Rumah",
            consequence: {
              type: "exploration",
              description: "Kamu mendorong pintu depan yang mengeluarkan suara berderit dan melangkah masuk ke dalam rumah masa kecilmu.",
              sanityChange: -5,
              nextSceneId: "house_foyer"
            }
          }
        ]
      },
      scenes: [
        {
          id: "house_foyer",
          narration: "Ruang depan rumah dipenuhi debu dan sarang laba-laba. Foto-foto keluarga yang tergantung di dinding tampak rusak, dengan wajah-wajah yang terbakar atau tercabik.",
          dialog: "Ethan: \"Apa yang terjadi di sini...?\"",
          choices: [
            {
              id: "examine_photos",
              text: "Periksa Foto-foto",
              consequence: {
                type: "discovery",
                description: "Kamu melihat foto-foto keluargamu—ayah, ibu, adik perempuan. Semua wajah telah dirusak dengan cara yang mengerikan.",
                nextSceneId: "family_photos"
              }
            },
            {
              id: "explore_living_room",
              text: "Jelajahi Ruang Tamu",
              consequence: {
                type: "exploration",
                description: "Kamu memutuskan untuk memeriksa ruang tamu terlebih dahulu.",
                nextSceneId: "living_room"
              }
            }
          ]
        },
        {
          id: "family_photos",
          narration: "Kamu mengamati foto-foto itu. Salah satunya menunjukkan keluarga bahagia—tapi wajah semua orang kecuali dirimu telah dirusak. Di belakang salah satu foto, Kamu menemukan tulisan tangan: 'Selamat ulang tahun ke-10, Ethan sayang. -Ibu'",
          dialog: "Ethan: \"Kenapa semua wajah dirusak...?\"",
          choices: [
            {
              id: "look_for_intact_photos",
              text: "Cari Foto yang Utuh",
              consequence: {
                type: "discovery",
                description: "Kamu mencari di antara puing-puing dan menemukan kotak foto yang terkunci di bawah tangga.",
                nextSceneId: "locked_photo_box"
              }
            },
            {
              id: "move_to_living_room",
              text: "Pergi ke Ruang Tamu",
              consequence: {
                type: "exploration",
                description: "Kamu memutuskan untuk memeriksa ruang tamu.",
                nextSceneId: "living_room"
              }
            }
          ]
        },
        {
          id: "locked_photo_box",
          narration: "Kotak foto itu terkunci dengan gembok kecil. Tampaknya memerlukan kunci atau kode.",
          puzzleData: {
            id: "photo_box",
            description: "Buka kotak foto yang terkunci.",
            solution: "Tanggal ulang tahun Ethan",
            hint: "Lihat belakang foto"
          },
          choices: [
            {
              id: "try_birthday",
              text: "Gunakan Tanggal Ulang Tahun",
              consequence: {
                type: "puzzle_solved",
                description: "Kamu mencoba memasukkan tanggal yang tertulis di belakang foto dan gembok terbuka!",
                nextSceneId: "complete_family_photo"
              }
            },
            {
              id: "break_box",
              text: "Paksa Buka Kotak",
              consequence: {
                type: "puzzle_failed",
                description: "Kamu mencoba memaksa membuka kotak itu, tapi malah merusaknya. Sebagian foto di dalamnya rusak.",
                nextSceneId: "damaged_family_photo"
              }
            }
          ]
        },
        {
          id: "complete_family_photo",
          narration: "Di dalam kotak, Kamu menemukan foto keluarga yang utuh dan terjaga dengan baik. Kamu, ayahmu, ibumu, dan adik perempuanmu tersenyum bahagia.",
          dialog: "Ethan: \"Keluargaku... apa yang terjadi pada mereka?\"",
          choices: [
            {
              id: "secret_room_reveal",
              text: "Pasang Foto di Tempatnya",
              consequence: {
                type: "secret_discovery",
                description: "Saat Kamu memasang foto itu di dinding, terdengar suara klik dan dinding di sampingnya bergeser, menampakkan ruangan rahasia.",
                nextSceneId: "secret_room"
              }
            }
          ]
        },
        {
          id: "damaged_family_photo",
          narration: "Kotak itu rusak, dan beberapa foto di dalamnya robek. Kamu masih bisa melihat sebagian foto keluargamu, tapi tidak lengkap.",
          dialog: "Ethan: \"Setidaknya aku bisa melihat wajah mereka...\"",
          choices: [
            {
              id: "go_to_living_room",
              text: "Pergi ke Ruang Tamu",
              consequence: {
                type: "exploration",
                description: "Kamu memutuskan untuk memeriksa ruang tamu.",
                nextSceneId: "living_room"
              }
            }
          ]
        },
        {
          id: "living_room",
          narration: "Ruang tamu penuh dengan perabotan rusak dan kaca pecah. Ada jejak darah kering yang mengarah ke tangga.",
          dialog: "Ethan: \"Tuhan... apa yang terjadi di sini?\"",
          choices: [
            {
              id: "follow_blood_trail",
              text: "Ikuti Jejak Darah",
              consequence: {
                type: "exploration",
                description: "Kamu mengikuti jejak darah yang mengarah ke lantai atas.",
                nextSceneId: "upstairs_hallway"
              }
            },
            {
              id: "check_fireplace",
              text: "Periksa Perapian",
              consequence: {
                type: "discovery",
                description: "Di dalam perapian Kamu menemukan sisa-sisa kertas yang terbakar sebagian.",
                nextSceneId: "burnt_documents"
              }
            }
          ]
        },
        {
          id: "burnt_documents",
          narration: "Kamu mengambil sisa-sisa kertas terbakar dari perapian. Tampaknya berisi laporan medis. Kamu masih bisa membaca beberapa bagian: '...pasien menunjukkan tanda-tanda kekerasan dan delusi... pengobatan tidak efektif...'",
          dialog: "Ethan: \"Laporan medis? Tentang siapa?\"",
          choices: [
            {
              id: "continue_search",
              text: "Lanjutkan Pencarian",
              consequence: {
                type: "exploration",
                description: "Kamu memutuskan untuk melanjutkan pencarianmu.",
                nextSceneId: "upstairs_hallway"
              }
            }
          ]
        },
        {
          id: "secret_room",
          narration: "Ruangan rahasia itu kecil dan gelap. Di dalamnya terdapat meja dengan diary dan beberapa surat.",
          dialog: "Ethan: \"Apa yang disembunyikan di sini...?\"",
          choices: [
            {
              id: "read_diary",
              text: "Baca Diary",
              consequence: {
                type: "revelation",
                description: "Kamu membuka diary dan membaca tulisan dengan nada marah dan paranoid. Tertulis nama: 'Diary Ethan Carter'.",
                sanityChange: -15,
                nextSceneId: "diary_revelation"
              }
            },
            {
              id: "examine_letters",
              text: "Periksa Surat-surat",
              consequence: {
                type: "discovery",
                description: "Surat-surat itu berasal dari rumah sakit jiwa Blackwood. Mereka membahas kondisi pasien yang bernama Ethan Carter.",
                sanityChange: -10,
                nextSceneId: "medical_letters"
              }
            }
          ]
        },
        {
          id: "diary_revelation",
          narration: "Diary itu berisi tulisan yang semakin tidak koheren. Entri terakhir berbunyi: \"Mereka semua bersekongkol melawanku. Ayah dengan pabriknya. Ibu yang selalu membelanya. Sarah yang tidak pernah berhenti menangis. Aku akan mengakhiri semuanya malam ini.\"",
          dialog: "Ethan: \"Tidak... aku tidak mungkin...\"",
          choices: [
            {
              id: "deny_diary",
              text: "Bantah Isi Diary",
              consequence: {
                type: "psychological",
                description: "Kamu melempar diary itu. \"Ini bukan milikku! Ini bukan tulisanku!\" teriakmu.",
                sanityChange: -15,
                truthMeters: { denial: +30 },
                nextSceneId: "upstairs_hallway"
              }
            },
            {
              id: "accept_diary",
              text: "Terima Kebenaran",
              consequence: {
                type: "psychological",
                description: "Kamu menutup diary dengan tangan gemetar. Ingatan gelap mulai kembali.",
                sanityChange: -20,
                truthMeters: { acceptance: +30 },
                nextSceneId: "upstairs_hallway"
              }
            }
          ]
        },
        {
          id: "medical_letters",
          narration: "Surat-surat itu membahas kesehatan mental Ethan Carter yang semakin memburuk setelah tragedi di pabrik. Disebutkan bahwa dia mengalami delusi dan menyalahkan keluarganya.",
          dialog: "Ethan: \"Jadi setelah kejadian di pabrik, aku... kehilangan akal?\"",
          choices: [
            {
              id: "investigate_further",
              text: "Selidiki Lebih Lanjut",
              consequence: {
                type: "exploration",
                description: "Kamu memutuskan untuk mencari lebih banyak bukti di dalam rumah.",
                nextSceneId: "upstairs_hallway"
              }
            }
          ]
        },
        {
          id: "upstairs_hallway",
          narration: "Lorong lantai atas dipenuhi pintu-pintu ke berbagai ruangan. Jejak darah mengarah ke pintu paling ujung—kamar utama.",
          dialog: "Ethan: \"Aku harus tahu apa yang terjadi...\"",
          choices: [
            {
              id: "check_child_room",
              text: "Periksa Kamar Anak",
              consequence: {
                type: "exploration",
                description: "Kamu membuka pintu kamar yang tampaknya milik seorang anak perempuan.",
                nextSceneId: "sarah_room"
              }
            },
            {
              id: "follow_blood_to_master",
              text: "Ikuti Jejak Darah",
              consequence: {
                type: "exploration",
                description: "Kamu mengikuti jejak darah yang mengarah ke kamar utama.",
                nextSceneId: "master_bedroom"
              }
            }
          ]
        },
        {
          id: "sarah_room",
          narration: "Kamar bercat merah muda itu pasti milik adikmu, Sarah. Boneka-boneka rusak berserakan di lantai. Ada bercak darah di tempat tidur kecilnya.",
          dialog: "Ethan: \"Sarah... apa yang kulakukan padamu?\"",
          choices: [
            {
              id: "search_under_bed",
              text: "Cari di Bawah Tempat Tidur",
              consequence: {
                type: "discovery",
                description: "Di bawah tempat tidur, Kamu menemukan gambar crayon yang menunjukkan figur laki-laki dengan pisau dikelilingi tubuh-tubuh.",
                sanityChange: -20,
                nextSceneId: "child_drawing"
              }
            },
            {
              id: "go_to_master_bedroom",
              text: "Pergi ke Kamar Utama",
              consequence: {
                type: "exploration",
                description: "Dengan perasaan takut, Kamu memutuskan untuk memeriksa kamar utama.",
                nextSceneId: "master_bedroom"
              }
            }
          ]
        },
        {
          id: "child_drawing",
          narration: "Gambar crayon itu menunjukkan figur tinggi dengan pisau, dikelilingi tiga tubuh. Tertulis dengan tulisan anak-anak: \"Kakak jahat saat marah.\"",
          dialog: "Ethan: \"Sarah... apa aku menyakitimu juga?\"",
          choices: [
            {
              id: "confront_master_bedroom",
              text: "Hadapi Kamar Utama",
              consequence: {
                type: "progression",
                description: "Dengan rasa bersalah yang menghancurkan, Kamu melangkah menuju kamar utama.",
                sanityChange: -10,
                nextSceneId: "master_bedroom"
              }
            }
          ]
        },
        {
          id: "master_bedroom",
          narration: "Kamu membuka pintu kamar utama dan menemukan pemandangan yang mengerikan. Dinding dan tempat tidur dipenuhi bercak darah kering. Di tengah ruangan, Kamu melihat sosok yang mirip dirimu berdiri membelakangimu.",
          dialog: "Ethan: \"Siapa Kamu?\"",
          choices: [
            {
              id: "confront_doppelganger",
              text: "Hadapi & Ajukan Pertanyaan",
              consequence: {
                type: "encounter",
                description: "Sosok itu berbalik, menampakkan wajah yang identik denganmu, tapi dengan mata kosong dan senyum mengerikan.",
                nextSceneId: "doppelganger_confrontation"
              }
            },
            {
              id: "break_mirror",
              text: "Hancurkan Cermin",
              consequence: {
                type: "escape",
                description: "Kamu menyadari bahwa itu adalah cermin besar di seberang ruangan. Dengan amarah dan ketakutan, Kamu memukulnya hingga hancur.",
                sanityChange: -15,
                nextSceneId: "broken_mirror",
              }
            }
          ]
        },
        {
          id: "broken_mirror",
          narration: "Pecahan cermin berserakan di lantai. Dalam setiap pecahan, Kamu melihat refleksi wajahmu yang tersenyum dengan cara yang tidak alami.",
          dialog: "Ethan: \"Cukup! Aku tidak mau melihatnya lagi!\"",
          choices: [
            {
              id: "investigate_room",
              text: "Periksa Kamar",
              consequence: {
                type: "discovery",
                description: "Kamu memeriksa kamar dan menemukan buku harian ibumu di bawah bantal. Halaman terakhirnya berisi tulisan ketakutan tentang perilaku tidak stabil Ethan.",
                sanityChange: -10,
                nextSceneId: "mother_diary"
              }
            }
          ]
        },
        {
          id: "doppelganger_confrontation",
          narration: "Sosok yang identik denganmu itu tersenyum. 'Akhirnya Kamu menemukanku,' katanya dengan suara yang sama persis dengan suaramu.",
          dialog: "Doppelgänger: \"Kamu tahu siapa aku... Aku adalah bagian yang Kamu tolak.\"",
          choices: [
            {
              id: "ask_about_family",
              text: "Tanya Tentang Keluarga",
              consequence: {
                type: "revelation",
                description: "Doppelgänger tertawa dan berkata, 'Kamu membunuh mereka, Ethan. Setelah kecelakaan pabrik, Kamu kehilangan akal sehatmu. Kamu membunuh mereka semua di kamar ini.'",
                sanityChange: -25,
                truthMeters: { acceptance: +35 },
                nextSceneId: "truth_revelation"
              }
            },
            {
              id: "attack_doppelganger",
              text: "Serang Doppelgänger",
              consequence: {
                type: "battle",
                description: "Kamu menyerang sosok itu, tapi tanganmu menembus seperti kabut. Sosok itu tertawa mengejek.",
                sanityChange: -15,
                nextSceneId: "doppelganger_laughs"
              }
            }
          ]
        },
        {
          id: "mother_diary",
          narration: "Kamu membaca tulisan terakhir ibumu: 'Ethan semakin tidak stabil sejak kecelakaan. Dokter mengatakan obat-obatan akan membantu, tapi dia menolak meminumnya. Aku takut pada tatapannya sekarang. Aku harus melindungi Sarah...'",
          dialog: "Ethan: \"Ibu... apa yang kulakukan padamu?\"",
          choices: [
            {
              id: "final_confrontation",
              text: "Hadapi Kebenaran",
              consequence: {
                type: "chapter_progression",
                description: "Dengan hati yang hancur, Kamu memutuskan untuk menghadapi kebenaran terakhir.",
                nextChapterId: "chapter5",
                nextSceneId: "church_entrance"
              }
            }
          ]
        },
        {
          id: "doppelganger_laughs",
          narration: "Doppelgänger tertawa semakin keras. Suaranya bergema di seluruh ruangan. 'Kamu tidak bisa menyangkal aku, Ethan. Aku adalah Kamu yang sebenarnya.'",
          dialog: "Doppelgänger: \"Kamu pembunuh, Ethan. Kamu membunuh mereka semua.\"",
          choices: [
            {
              id: "deny_accusation",
              text: "Tolak Tuduhan",
              consequence: {
                type: "psychological",
                description: "Kamu berteriak menolak tuduhan itu, tapi bayangan-bayangan masa lalu mulai menampakkan diri di sekitarmu.",
                sanityChange: -20,
                truthMeters: { denial: +35 },
                nextSceneId: "denial_shadows"
              }
            },
            {
              id: "accept_revelation",
              text: "Terima Kebenaran",
              consequence: {
                type: "revelation",
                description: "Dengan berat, Kamu mulai menerima kebenaran yang mengerikan tentang apa yang telah Kamu lakukan.",
                sanityChange: -25,
                truthMeters: { acceptance: +35 },
                nextSceneId: "truth_revelation"
              }
            }
          ]
        },
        {
          id: "denial_shadows",
          narration: "Kamu terus menyangkal, tapi bayangan-bayangan masa lalu berputar di sekitarmu. Kamu melihat kilasan dirimu sendiri memegang pisau berlumuran darah, berdiri di atas tubuh-tubuh keluargamu.",
          dialog: "Ethan: \"Tidak! Itu bukan aku! Bukan aku yang melakukannya!\"",
          choices: [
            {
              id: "final_confrontation_denial",
              text: "Pergi dari Sini",
              consequence: {
                type: "chapter_progression",
                description: "Kamu berlari keluar rumah, masih menyangkal apa yang Kamu lihat.",
                truthMeters: { denial: +15 },
                nextChapterId: "chapter5",
                nextSceneId: "church_entrance"
              }
            }
          ]
        },
        {
          id: "truth_revelation",
          narration: "Ingatan-ingatan mengerikan menghantam kesadaranmu seperti badai. Kamu melihat dirimu pulang dari rumah sakit jiwa, menolak minum obat, dan dalam kegilaan, menghabisi seluruh keluargamu di kamar ini.",
          dialog: "Ethan: \"Apa yang telah kulakukan...? Ya Tuhan...\"",
          choices: [
            {
              id: "final_confrontation_acceptance",
              text: "Hadapi Konsekuensi",
              consequence: {
                type: "chapter_progression",
                description: "Dengan perasaan bersalah yang luar biasa, Kamu memutuskan untuk menghadapi konsekuensi dari tindakanmu.",
                truthMeters: { acceptance: +15 },
                nextChapterId: "chapter5",
                nextSceneId: "church_entrance"
              }
            }
          ]
        }
      ]
    },
    {
      id: "chapter5",
      title: "Akhir dari Segalanya",
      initialScene: {
        id: "church_entrance",
        narration: "Kamu tiba di gereja tua di puncak bukit. Bangunan itu tampak mengerikan dengan ukiran-ukiran wajah yang menjerit di tiap sudutnya. Kabut tebal mengelilingi tempat itu.",
        dialog: "Ethan: \"Tempat ini... entah kenapa terasa familiar.\"",
        choices: [
          {
            id: "enter_church",
            text: "Masuk ke Gereja",
            consequence: {
              type: "exploration",
              description: "Kamu mendorong pintu gereja yang berat dan masuk ke dalam kegelapan.",
              nextSceneId: "church_interior"
            }
          }
        ]
      },
      scenes: [
        {
          id: "church_interior",
          narration: "Interior gereja dipenuhi lilin-lilin yang menyala dengan sendirinya. Altar di ujung ruangan dipenuhi bercak darah kering. Di tengah gereja terdapat meja dengan potongan-potongan surat berserakan.",
          dialog: "Ethan: \"Tempat apa ini...?\"",
          choices: [
            {
              id: "approach_altar",
              text: "Dekati Altar",
              consequence: {
                type: "discovery",
                description: "Saat Kamu mendekati altar, Kamu melihat ukiran nama-nama: ayahmu, ibumu, adikmu... dan namamu sendiri, yang tercoret.",
                sanityChange: -15,
                nextSceneId: "altar_names"
              }
            },
            {
              id: "examine_letter_pieces",
              text: "Periksa Potongan Surat",
              consequence: {
                type: "puzzle",
                description: "Kamu mulai memeriksa potongan-potongan surat yang berserakan.",
                nextSceneId: "letter_puzzle"
              }
            }
          ]
        },
        {
          id: "altar_names",
          narration: "Nama-nama itu terukir dengan tajam di altar. Di bawahnya terdapat tanggal—tanggal yang sama untuk ketiga anggota keluargamu, dan berbeda untuk namamu yang tercoret.",
          dialog: "Ethan: \"Itu tanggal mereka... meninggal.\"",
          choices: [
            {
              id: "back_to_letter",
              text: "Kembali ke Potongan Surat",
              consequence: {
                type: "exploration",
                description: "Kamu memutuskan untuk memeriksa potongan-potongan surat yang berserakan.",
                nextSceneId: "letter_puzzle"
              }
            }
          ]
        },
        {
          id: "letter_puzzle",
          narration: "Potongan-potongan surat itu tampaknya bisa disusun menjadi satu dokumen utuh. Beberapa bagian masih bisa terbaca: '...pasien Ethan Carter menunjukkan gejala paranoid schizophrenia parah...' dan '...menolak pengobatan setelah dilepaskan dari perawatan...'",
          puzzleData: {
            id: "reconstruct_letter",
            description: "Susun potongan-potongan surat menjadi dokumen utuh.",
            solution: "Surat diagnosa dari Rumah Sakit Jiwa Blackwood",
            hint: "Urutkan berdasarkan tanggal di tiap potongan"
          },
          choices: [
            {
              id: "solve_letter_puzzle",
              text: "Susun Surat",
              consequence: {
                type: "puzzle_solved",
                description: "Kamu berhasil menyusun semua potongan surat itu. Dokumen lengkapnya adalah surat dari Rumah Sakit Jiwa Blackwood yang membahas kondisimu yang tidak stabil setelah tragedi pabrik, dan perilaku kekerasanmu yang semakin parah.",
                sanityChange: -20,
                nextSceneId: "letter_revelation"
              }
            }
          ]
        },
        {
          id: "letter_revelation",
          narration: "Surat itu mengungkapkan kebenaran mengerikan: setelah tragedi pabrik, Kamu mengalami gangguan jiwa parah. Kamu dirawat selama beberapa bulan sebelum dipulangkan dengan kondisi yang tampak stabil. Namun, Kamu berhenti minum obat dan mengalami psikosis berat, yang berujung pada pembunuhan seluruh keluargamu dalam keadaan tidak sadar.",
          dialog: "Ethan: \"Jadi... selama ini aku terjebak dalam ilusi ciptaanku sendiri?\"",
          choices: [
            {
              id: "moment_of_clarity",
              text: "Terima Kenyataan",
              consequence: {
                type: "revelation",
                description: "Saat Kamu mulai menerima kebenaran, ruangan gereja berubah. Lilin-lilin padam satu per satu, dan sosok The Truth muncul di depanmu.",
                truthMeters: { acceptance: +20 },
                nextSceneId: "the_truth_appears"
              }
            },
            {
              id: "reject_evidence",
              text: "Tolak Bukti",
              consequence: {
                type: "psychological",
                description: "Kamu merobek surat itu dan menolak mempercayainya. Tiba-tiba, suara tawa gila menggema di seluruh gereja.",
                sanityChange: -25,
                truthMeters: { denial: +20 },
                nextSceneId: "the_truth_angry"
              }
            }
          ]
        },
        {
          id: "the_truth_appears",
          narration: "Di hadapanmu muncul sosok identik denganmu, tapi dengan luka di seluruh tubuh—The Truth. Matanya kosong dan kulitnya pucat seperti mayat.",
          dialog: "The Truth: \"Akhirnya Kamu menemukan aku, Ethan. Aku adalah kebenaran yang Kamu kubur dalam-dalam.\"",
          monsterData: {
            id: "the_truth",
            name: "The Truth",
            description: "Manifestasi kebenaran dari diri Ethan yang sebenarnya, dengan luka di seluruh tubuh dan mata kosong.",
            health: 100,
            attackPower: 30
          },
          choices: [
            {
              id: "accept_fate",
              text: "Terima Takdirmu",
              consequence: {
                type: "ending",
                description: "Kamu menerima kebenaran dan semua yang telah Kamu lakukan. 'Aku siap menghadapi konsekuensinya,' bisikmu.",
                ending: "redemption",
                nextSceneId: "ending_redemption"
              }
            },
            {
              id: "fight_the_truth",
              text: "Serang The Truth",
              consequence: {
                type: "battle",
                description: "Kamu menyerang The Truth dengan segala yang Kamu miliki, mencoba menghapus kebenaran itu.",
                battleOutcome: {
                  victory: {
                    description: "Kamu berhasil mengalahkan The Truth, tapi saat sosok itu menghilang, Kamu merasa bagian dari dirimu sendiri ikut lenyap.",
                    nextSceneId: "ending_insanity"
                  },
                  defeat: {
                    description: "The Truth terlalu kuat. Kamu jatuh ke tanah, tidak berdaya menghadapi kebenaran.",
                    nextSceneId: "ending_redemption"
                  }
                }
              }
            }
          ]
        },
        {
          id: "the_truth_angry",
          narration: "Gereja bergetar hebat. Sosok The Truth muncul, tapi kali ini dengan ekspresi marah dan mengerikan.",
          dialog: "The Truth: \"Kamu masih menyangkalku? Setelah semua yang Kamu lihat?\"",
          monsterData: {
            id: "the_truth_enraged",
            name: "The Truth (Enraged)",
            description: "Versi marah dari The Truth, lebih kuat dan berbahaya.",
            health: 120,
            attackPower: 35
          },
          choices: [
            {
              id: "continue_denial",
              text: "Tolak Kebenaran",
              consequence: {
                type: "ending",
                description: "Kamu terus menyangkal dan berteriak bahwa ini semua bohong. 'Ini bukan aku! Ini semua bohong!'",
                ending: "cycle",
                nextSceneId: "ending_cycle"
              }
            },
            {
              id: "last_moment_acceptance",
              text: "Akui Kesalahanmu",
              consequence: {
                type: "ending",
                description: "Di saat terakhir, Kamu mengakui kesalahanmu dan menerima takdirmu.",
                ending: "redemption",
                nextSceneId: "ending_redemption"
              }
            }
          ]
        },
        {
          id: "ending_redemption",
          narration: "Kota berkabut mulai menghilang di sekitarmu. Cahaya putih menyelimutimu, dan Kamu merasa damai untuk pertama kalinya.",
          dialog: "Ethan: \"Aku tidak bisa mengubah masa lalu... tapi aku bisa menerimanya.\"",
          choices: [
            {
              id: "final_acceptance",
              text: "Biarkan Cahaya Membawamu",
              consequence: {
                type: "game_end",
                description: "Kamu terbangun di rumah sakit jiwa, dengan dokter dan perawat di sekitarmu. 'Dia kembali,' kata salah satu dari mereka. Untuk pertama kalinya dalam bertahun-tahun, pikiranmu jernih dan Kamu siap menerima konsekuensi dari tindakanmu.",
                ending: "redemption"
              }
            }
          ]
        },
        {
          id: "ending_cycle",
          narration: "Kota berkabut tetap ada di sekitarmu, bahkan kabut semakin tebal. Suara tawa mengerikan menggema dari segala arah.",
          dialog: "Ethan: \"Ini semua bohong! Aku tidak percaya!\"",
          choices: [
            {
              id: "restart_cycle",
              text: "Coba Lagi",
              consequence: {
                type: "game_end",
                description: "Kamu terbangun kembali di jalanan berkabut, seperti di awal cerita. Siklus mimpi burukmu dimulai lagi, dan Kamu terjebak dalam lingkaran setan penyangkalan yang tak berujung.",
                ending: "cycle"
              }
            }
          ]
        },
        {
          id: "ending_insanity",
          narration: "Saat Kamu mengalahkan The Truth, Kamu merasa bagian dari dirimu menghilang. Pandanganmu mulai berubah, dan Kamu melihat dunia dengan cara yang sama sekali berbeda.",
          dialog: "Ethan: \"Aku akan menghancurkan semuanya!\"",
          choices: [
            {
              id: "embrace_madness",
              text: "Terima Kegilaan",
              consequence: {
                type: "game_end",
                description: "Kamu kehilangan semua ingatan dan identitasmu, berubah menjadi bayangan gelap di kota berkabut—monster baru yang akan menghantui jiwa-jiwa tersiksa lainnya. Bayanganmu sendiri berbisik, 'Kamu sekarang bagian dari kami...'",
                ending: "insanity"
              }
            }
          ]
        }
      ]
    }
  ]
  }