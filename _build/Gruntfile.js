module.exports = function(grunt) {

  /////////////////////////////////////////////////////////////////////////
  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),
    cfg: grunt.file.readJSON("config.json"),
    webDir:"../",
    availabletasks: {
      tasks: {
        options: {
          sort: true,
          filter: "include",
          tasks: ["default","install", "cleanup","speed","compile:images","watch","build","watch:scripts", "compile:scripts", "compile:styles", "watch:styles", "sync"]
        }
      }
    },
    shell: {
      options: {
        stdout: true,
        stderr: true,
        stdin: true
      },
      install: {
        command: function() {
          return "bower cache clean && bower install";
        }
      },
    },
    requirejs: {
      compile: {
        options: {
          baseUrl: "<%=cfg.jsDevDir%>",
          mainConfigFile: "<%=cfg.jsMainFile%>",
          name: "<%=cfg.jsMainName%>",
          out: "<%=cfg.jsMinFile%>"
        }
      }
    },
    compass: {
      compile: {
        options: {
          httpPath: "<%=cfg.baseURL%>",
          sassDir: "<%=cfg.sassDir%>",
          cssDir: "<%=cfg.cssDir%>",
          imagesDir: "<%=cfg.imgDir%>",
          fontsDir: "<%=cfg.fontsDir%>",
          httpStylesheetsPath:"<%=cfg.cssDir%>",
          cacheDir: "<%=localDir%>/.sass-cache",
          outputStyle:"compressed",
          force: true,
          relativeAssets:true,
          lineComments:false,
          raw: "preferred_syntax = :sass\n",
          environment: "production",
          require: ["sass-css-importer"]
        }
      }
    },
    watch: {
      js: {
        files: ["<%=cfg.jsDevDir%>/**/*.js"],
        tasks: ["compile:scripts"]
      },
      sass: {
        files: ["<%=cfg.sassDir%>/**/*.scss"],
        tasks: ["compile:styles"]
      },
      everything: {
        files: ["<%=cfg.sassDir%>/**/*.scss", "<%=cfg.jsDevDir%>/**/*.js"],
        tasks: ["compile:scripts", "compile:styles"]
      }
    },
    clean: {
      options: { 
        force: true 
      },
      default: {
        src: "<%=cfg.cleanFiles%>"
      }
    },   
    copyFiles: {
      main: {
        files: "<%=cfg.copyFiles%>"
      }
    },
    autoprefixer: {
      options: {
       browsers: ["last 2 version"]
     },
     default: {
       files: [{
        expand: true, 
        cwd: "<%=cfg.cssDir%>/",
      src: "{,*/}*.css",
      dest: "<%=cfg.cssDir%>/"
    }]
  }
}
});

  /////////////////////////////////////////////////////////////////////////
  grunt.loadNpmTasks("grunt-available-tasks");
  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-contrib-requirejs");
  grunt.loadNpmTasks("grunt-contrib-compass");
  grunt.loadNpmTasks("grunt-contrib-clean");
  grunt.loadNpmTasks("grunt-autoprefixer");
  grunt.loadNpmTasks("grunt-shell");

  /////////////////////////////////////////////////////////////////////////
  grunt.registerTask("default", "These help instructions",["availabletasks"]);
  grunt.registerTask("cleanup", "Clean project",["clean:default"]);
  grunt.registerTask("install", "Install the project",["shell:install", "copyFiles:main"]);
  grunt.registerTask("watch:scripts", "Watch and compile js files",["watch:js"]);
  grunt.registerTask("watch:all", "Watch all (scripts + styles)",["watch:everything"]);
  grunt.registerTask("watch:styles", "Compile sass files",["watch:sass"]);
  grunt.registerTask("compile:scripts", "Compile js files",["requirejs:compile"]);
  grunt.registerTask("compile:styles", "Watch and compile sass files",["compass:compile","autoprefixer"]);
  grunt.registerTask("build", "Build all (scripts + styles)",["install", "compile:styles","compile:scripts"]);

  /////////////////////////////////////////////////////////////////////////
  grunt.task.registerMultiTask("copyFiles", function() {
    var path = require("path");
    for(file in this.data.files) {
      var filesCopy = grunt.file.expand(file);
      for(fileCopy in filesCopy) {
        var from = filesCopy[fileCopy];
        var to = path.join(this.data.files[file], path.basename(from));
        grunt.log.ok("Copying "+from+" to "+to)
        grunt.file.copy(from, to);
      }
    }
  });
};